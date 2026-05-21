const prisma = require("../../DB_connect/prisma");
const express = require("express");
const router = express.Router();

const { sendStatusEmail } = require('../emailService');

const { db } = require('../firebaseAdmin');

const {
  uploadCV,
  getCVUrl,
  deleteCV,
} = require("../../DB_connect/storage_service");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
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

    res.status(201).json({
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

/* =========================
   PROVIDER LISTINGS
========================= */

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
    console.error("Error in /provider:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   APPROVED LISTINGS
========================= */

router.get("/approved", async (req, res) => {
  const { type, userEmail } = req.query;

  try {
    const whereClause = { status: "approved" };

    if (type) {
      whereClause.list_type = type;
    }

    // Fetch saved listing IDs for this user
    let savedListingIds = new Set();
    if (userEmail) {
      // Look up the firebase_uid from the User table using the email
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { firebase_uid: true }
      });

      if (user) {
        const savedListings = await prisma.savedListing.findMany({
          where: { userId: user.firebase_uid },
          select: { listingId: true }
        });
        savedListingIds = new Set(savedListings.map(s => s.listingId));
      }
    }

    const listings = await prisma.listing.findMany({
      where: whereClause,
      include: {
        provider: true,
        applications: {
          include: { user: true }
        },
        _count: {
          select: { applications: true }
        },
      },
    });

    const results = listings.map((listing) => ({
      ...listing,
      hasApplied: userEmail
        ? listing.applications.some(a => a.user?.email === userEmail)
        : false,
      applicantCount: listing._count?.applications ?? listing.applications.length,
      isSaved: savedListingIds.has(listing.listings_id),  // ← added
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error("REAL LISTINGS ERROR:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   ALL LISTINGS
========================= */

router.get("/all", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        status: { not: "deleted" }
      },
      include: { provider: true },
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error in /all:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   PENDING LISTINGS
========================= */

router.get("/pending", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: { status: "pending" },
      include: { provider: true },
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error in /pending:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.post("/apply", async (req, res) => {
  const { listing_id, email, motivation, availability, cv_name } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const listing = await prisma.listing.findUnique({
      where: { listings_id: parseInt(listing_id) },
    });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    const existing = await prisma.application.findFirst({
      where: {
        user_id: user.user_id,
        listing_id: parseInt(listing_id),
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Already applied." });
    }

    const application = await prisma.application.create({
      data: {
        user_id: user.user_id,
        listing_id: parseInt(listing_id),
        provider_id: listing.provider_id,

        status: "pending",
      },
    });

    res.status(201).json({
      message: "Application submitted!",
      application,
    });
  } catch (error) {
    console.error("Apply error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.get("/my-applications", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const applications = await prisma.application.findMany({
      where: { user_id: user.user_id },
      include: { listing: true },
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("MY-APPLICATIONS ERROR:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   PROVIDER APPLICATIONS
========================= */

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
      where: {
        provider_id: user.provider.provider_id,
      },
      include: {
        user: true,
        listing: true,
      },
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Provider applications error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   UPDATE LISTING STATUS
========================= */
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const listing = await prisma.listing.update({
      where: { listings_id: parseInt(id) },
      data: { status }, // <--- Changes it to "deleted"
    });

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error in PATCH /:id/status:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   DELETE LISTING
========================= */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { report_id } = req.body;

  try {
    // Soft Delete: Just updates the status
    await prisma.listing.update({
      where: { listings_id: parseInt(id) },
      data: { status: "deleted" }
    });

    if (report_id) {
      await prisma.report.update({
        where: { report_id: parseInt(report_id) },
        data: { status: "resolved" }
      });
    }
    res.status(200).json({ message: "Listing marked as deleted." });
  } catch (error) {
    console.error("Error in DELETE:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


// UPDATE LISTING (Any status -> back to PENDING)


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { listname, list_type, nqf_level, location, stipend, duration, requirements, description, closing_date } = req.body;

  try {
    const existing = await prisma.listing.findUnique({
      where: { listings_id: parseInt(id) }
    });

    if (!existing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // After ANY edit, status goes back to 'pending'
    const newStatus = 'pending';

    const updated = await prisma.listing.update({
      where: { listings_id: parseInt(id) },
      data: {
        listname,
        list_type,
        nqf_level: parseInt(nqf_level),
        location,
        stipend: parseFloat(stipend),
        duration,
        requirements,
        description,
        closing_date: new Date(closing_date),
        status: newStatus
      }
    });

    let message = 'Listing updated successfully';
    if (existing.status === 'approved') {
      message = 'Listing updated. It will be reviewed by admin before becoming visible to applicants again.';
    } else if (existing.status === 'rejected') {
      message = 'Listing resubmitted. Admin will review your changes.';
    }

    res.json({ updated, message });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Failed to update listing" });
  }
});



// GET SINGLE LISTING



router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.query;

  try {
    const listing = await prisma.listing.findUnique({
      where: { listings_id: parseInt(id) },
      include: {
        provider: true,
        applications: userEmail
          ? { where: { user: { email: userEmail } } }
          : false,
      },
    });

    if (!listing) {
      return res.status(404).json({
        error: "Listing not found",
      });
    }

    const result = {
      ...listing,
      hasApplied: listing.applications ? listing.applications.length > 0 : false,
    };

    res.json(result);
  } catch (error) {
    console.error("Error in /:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* =========================
   CREATE LISTING
========================= */

router.post("/post", postListing);
router.get("/:id/cv", async (req, res) => {
  try {
    const application = await prisma.application.findUnique({
      where: { application_id: parseInt(req.params.id) },
      select: { cvFilePath: true },
    });

    if (!application?.cvFilePath) {
      return res
        .status(404)
        .json({ error: "No CV found for this application." });
    }

    const signedUrl = await getCVUrl(application.cvFilePath);
    res.json({ url: signedUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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


// Update application status (hire/reject)
router.put("/applications/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const application = await prisma.application.update({
      where: { application_id: parseInt(id) },
      data: { status },
      include: { user: true, listing: true }
    });

    await db.collection("notifications").add({
      userId: application.user.firebase_uid || "MISSING_UID",
      type: "Application Update",
      message: `Your application for '${application.listing.listname}' has been marked as: ${status}.`,
      isRead: false,
      createdAt: new Date()
    });

    if (application.user && application.user.email) {
      await sendStatusEmail(
        application.user.email,
        application.user.name || "Applicant",
        application.listing.listname,
        status
      );
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("BACKEND CRASH:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
router.post("/post", postListing);
module.exports = router;