const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

// GET /api/dashboard/summary
// Returns the main metrics needed for the dashboard.
router.get("/summary", async (req, res) => {
  try {
    const totalListings = await prisma.listing.count();

    const totalApplications = await prisma.application.count();

    const pendingApplications = await prisma.application.count({
      where: { status: "pending" },
    });

    const successfulPlacements = await prisma.application.count({
      where: { status: "hired" },
    });

    const statusBreakdownRaw = await prisma.application.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const statusBreakdown = statusBreakdownRaw.map((item) => ({
      status: item.status,
      count: item._count.status,
    }));

    const applicationsPerOpportunityRaw = await prisma.listing.findMany({
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    const applicationsPerOpportunity = applicationsPerOpportunityRaw.map(
      (listing) => ({
        listingId: listing.listings_id,
        opportunity: listing.listname,
        count: listing._count.applications,
      }),
    );

    res.status(200).json({
      totalListings,
      totalApplications,
      pendingApplications,
      successfulPlacements,
      statusBreakdown,
      applicationsPerOpportunity,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ error: "Failed to load dashboard summary." });
  }
});

module.exports = router;