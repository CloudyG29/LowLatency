const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

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

/* =========================
   APPLY TO LISTING
========================= */

router.post("/apply", async (req, res) => {
  const { listing_id, email } = req.body;

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

/* =========================
   MY APPLICATIONS
========================= */

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
      data: { status },
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

  try {
    // 1. Snapshot listing name before deleting
    const listing = await prisma.listing.findUnique({
      where: { listings_id: parseInt(id) },
      select: { listname: true }
    });

    const listingName = listing?.listname || "Unknown";

    // 2. Preserve reports — nullify listing_id so they survive for archive
    try {
      await prisma.report.updateMany({
        where: { listing_id: parseInt(id) },
        data: {
          status: "resolved",
          listing_id: null,
          details: `[Listing "${listingName}" was deleted by admin]`
        },
      });
    } catch (_) {}

    // 3. Delete applications
    try {
      await prisma.application.deleteMany({
        where: { listing_id: parseInt(id) },
      });
    } catch (_) {}

    // 4. Delete listing
    await prisma.listing.delete({
      where: { listings_id: parseInt(id) },
    });

    res.status(200).json({ message: "Listing deleted." });
  } catch (error) {
    console.error("Error in DELETE /:id:", error);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
});

/* =========================
   UPDATE APPLICATION STATUS
========================= */

router.put("/applications/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await prisma.application.update({
      where: {
        application_id: parseInt(id),
      },
      data: { status },
    });

    res.status(200).json(application);
  } catch (error) {
    console.error("Application status update error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   GET SINGLE LISTING
   MUST BE LAST GET ROUTE
========================= */

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

module.exports = router;