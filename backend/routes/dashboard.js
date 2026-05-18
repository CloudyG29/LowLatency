const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

function normaliseOpportunityName(name) {
  const cleanedName = (name || "Untitled Opportunity").trim().toLowerCase();

  const nameMap = {
    ds: "Data Science",
  };

  if (nameMap[cleanedName]) {
    return nameMap[cleanedName];
  }

  return cleanedName
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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
    });

    const opportunityMap = {};

    opportunitiesRaw.forEach((listing) => {
      const opportunity = normaliseOpportunityName(listing.listname);
      const sector = listing.sector || "Unspecified";
      const applicationCount = listing._count.applications;
      const shortlistedCount = listing.applications.filter(
        (app) => app.status === "shortlisted",
      ).length;
      const placementCount = listing.applications.filter(
        (app) => app.status === "hired",
      ).length;

      if (!opportunityMap[opportunity]) {
        opportunityMap[opportunity] = {
          listingId: listing.listings_id,
          opportunity,
          sector,
          count: 0,
          shortlisted: 0,
          placements: 0,
        };
      }

      opportunityMap[opportunity].count += applicationCount;
      opportunityMap[opportunity].shortlisted += shortlistedCount;
      opportunityMap[opportunity].placements += placementCount;
    });

    const applicationsPerOpportunity = Object.values(opportunityMap)
      .map((item) => ({
        ...item,
        successRate:
          item.count === 0
            ? 0
            : Number(((item.placements / item.count) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count);

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