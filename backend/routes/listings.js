const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");
const multer = require("multer");
const { uploadCV, getCVUrl, deleteCV } = require("../storage_service");

async function postListing(req, res) {
  const {
    listname,
    list_type,
    nqf_level,
    description,
    email,
    stipend,
    location,
    duration,
    requirements,
    closing_date,
  } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { provider: true },
    });

    if (!user || !user.provider) {
      return res.status(404).json({ error: "Provider profile not found." });
    }

    const listing = await prisma.listing.create({
      data: {
        listname,
        list_type,
        nqf_level: nqf_level ? parseInt(nqf_level) : null,
        description,
        stipend: stipend ? parseFloat(stipend) : null,
        location: location || null,
        duration: duration || null,
        closing_date:
          closing_date && !isNaN(new Date(closing_date))
            ? new Date(closing_date)
            : null,
        requirements:
          requirements && typeof requirements === "string"
            ? requirements
            : null,
        provider_id: user.provider.provider_id,
      },
    });

    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

router.get("/provider", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { provider: true },
    });
    if (!user || !user.provider) {
      return res.status(404).json({ error: "Provider not found." });
    }
    const listings = await prisma.listing.findMany({
      where: { provider_id: user.provider.provider_id },
    });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/approved", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: { status: "approved" },
      include: { provider: true },
    });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/all", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      include: { provider: true },
    });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: { status: "pending" },
      include: { provider: true },
    });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/apply", async (req, res) => {
  const { listing_id, email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const listing = await prisma.listing.findUnique({
      where: { listings_id: parseInt(listing_id) },
    });
    if (!listing) return res.status(404).json({ error: "Listing not found." });

    const existing = await prisma.application.findFirst({
      where: { user_id: user.user_id, listing_id: parseInt(listing_id) },
    });
    if (existing) return res.status(400).json({ error: "Already applied." });

    const application = await prisma.application.create({
      data: {
        user_id: user.user_id,
        listing_id: parseInt(listing_id),
        provider_id: listing.provider_id,

        status: "pending",
      },
    });

    res.status(201).json({ message: "Application submitted!", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/my-applications", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const applications = await prisma.application.findMany({
      where: { user_id: user.user_id },
      include: { listing: true },
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error("MY-APPLICATIONS ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/provider-applications", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { provider: true },
    });
    if (!user || !user.provider) {
      return res.status(404).json({ error: "Provider not found." });
    }

    const applications = await prisma.application.findMany({
      where: { provider_id: user.provider.provider_id },
      include: { user: true, listing: true },
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error("PROVIDER-APPLICATIONS ERROR:", error.message); // 👈 add this
    res.status(500).json({ error: error.message }); // 👈 and this
  }
});

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const listing = await prisma.listing.update({
      where: { listings_id: parseInt(id) },
      data: { status },
    });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.listing.delete({
      where: { listings_id: parseInt(id) },
    });
    res.status(200).json({ message: "Listing deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Update application status (hire/reject)
router.put("/applications/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const application = await prisma.application.update({
      where: { application_id: parseInt(id) },
      data: { status },
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});
router.post("/post", postListing);

//the upcoming section is for CV upload and retrieval.

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  },
});

router.post("/:id/cv", upload.single("cv"), async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id);
    const { email } = req.body; // 👈 get email from body instead

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const filePath = await uploadCV(
      req.file.buffer,
      req.file.mimetype,
      user.user_id, // 👈 use DB user_id instead of Firebase uid
      applicationId,
    );

    await prisma.application.update({
      where: { application_id: applicationId },
      data: {
        cvFilePath: filePath,
        cvOriginalFilename: req.file.originalname,
        cvUploadedAt: new Date(),
      },
    });

    res.json({ success: true, message: "CV uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id/cv", async (req, res) => {
  try {
    const application = await prisma.application.findUnique({
      where: { application_id: parseInt(req.params.id) },
      select: { cvFilePath: true },
    });

    if (!application?.cvFilePath) {
      return res
        .status(404)
        .json({ error: "No CV found for this application" });
    }

    const signedUrl = await getCVUrl(application.cvFilePath);
    res.json({ url: signedUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
