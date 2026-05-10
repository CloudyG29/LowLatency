const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

router.get("/summary", async (req, res) => {
  try {
    const totalListings = await prisma.listing.count();
    const totalApplications = await prisma.application.count();

    const shortlistedApplicants = await prisma.application.count({
      where: { status: "shortlisted" },
    });

    const successfulPlacements = await prisma.application.count({
      where: { status: "hired" },
    });

    const averagePlacementRate =
      totalApplications === 0
        ? 0
        : Number(((successfulPlacements / totalApplications) * 100).toFixed(1));

    const statusBreakdownRaw = await prisma.application.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const statusBreakdown = statusBreakdownRaw.map((item) => ({
      status: item.status,
      count: item._count.status,
    }));

    const opportunitiesRaw = await prisma.listing.findMany({
      include: {
        _count: {
          select: { applications: true },
        },
        applications: true,
      },
      orderBy: {
        applications: {
          _count: "desc",
        },
      },
    });

    const applicationsPerOpportunity = opportunitiesRaw.map((listing) => ({
      listingId: listing.listings_id,
      opportunity: listing.listname,
      sector: listing.sector || "Unspecified",
      count: listing._count.applications,
      shortlisted: listing.applications.filter((app) => app.status === "shortlisted").length,
      placements: listing.applications.filter((app) => app.status === "hired").length,
      successRate:
        listing._count.applications === 0
          ? 0
          : Number(
              (
                (listing.applications.filter((app) => app.status === "hired").length /
                  listing._count.applications) *
                100
              ).toFixed(1),
            ),
    }));

    const sectorMap = {};

    opportunitiesRaw.forEach((listing) => {
      const sector = listing.sector || "Unspecified";

      if (!sectorMap[sector]) {
        sectorMap[sector] = {
          sector,
          applications: 0,
          placements: 0,
        };
      }

      sectorMap[sector].applications += listing.applications.length;
      sectorMap[sector].placements += listing.applications.filter(
        (app) => app.status === "hired",
      ).length;
    });

    const sectorAnalysis = Object.values(sectorMap).map((item) => ({
      ...item,
      successRate:
        item.applications === 0
          ? 0
          : Number(((item.placements / item.applications) * 100).toFixed(1)),
    }));

    res.status(200).json({
      totalListings,
      totalApplications,
      shortlistedApplicants,
      successfulPlacements,
      averagePlacementRate,
      statusBreakdown,
      applicationsPerOpportunity,
      sectorAnalysis,
      topOpportunities: applicationsPerOpportunity.slice(0, 5),
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ error: "Failed to load dashboard summary." });
  }
});

module.exports = router;