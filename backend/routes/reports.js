const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

// Check if user already reported this listing
router.get("/check", async (req, res) => {
  const { listing_id, email } = req.query;
  
  if (!listing_id || !email) {
    return res.status(400).json({ error: "Missing listing_id or email" });
  }
  
  try {
    const existing = await prisma.report.findFirst({
      where: {
        listing_id: parseInt(listing_id),
        reported_by: email
      }
    });
    res.json({ hasReported: !!existing });
  } catch (error) {
    console.error("Error checking report:", error);
    res.status(500).json({ error: "Failed to check report status" });
  }
});

// Submit a report
router.post("/", async (req, res) => {
  const { listing_id, reason, details, reported_by } = req.body;
  
  if (!listing_id || !reason || !reported_by) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!details || !details.trim()) {
    return res.status(400).json({ error: "Please provide details for your report." });
  }
  
  try {
    const report = await prisma.report.create({
      data: {
        listing_id: parseInt(listing_id),
        reason,
        details: details || "",
        reported_by,
        status: "pending"
      }
    });
    res.status(201).json({ message: "Report submitted", report });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Failed to submit report", details: error.message });
  }
});

// Get all reports (for admin)
router.get("/", async (req, res) => {
  try {
    // Try with listing + provider relation first
    let reports;
    try {
      reports = await prisma.report.findMany({
        include: {
          Listing: {
            include: { provider: true }
          }
        },
        orderBy: { created_at: "desc" }
      });
    } catch (relationError) {
      // If relation doesn't exist yet (schema not pushed), fetch without it
      console.warn("Report relation not available, fetching without include:", relationError.message);
      reports = await prisma.report.findMany({
        orderBy: { created_at: "desc" }
      });
    }
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports", details: error.message });
  }
});

// Get single report by ID (for detail page)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const report = await prisma.report.findUnique({
      where: { report_id: parseInt(id) },
      include: {
        Listing: {
          include: { provider: true }
        }
      }
    });
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Failed to fetch report", details: error.message });
  }
});

// Update report status (admin dismiss/resolve)
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const report = await prisma.report.update({
      where: { report_id: parseInt(id) },
      data: { status }
    });
    res.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ error: "Failed to update report", details: error.message });
  }
});

module.exports = router;