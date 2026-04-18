const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

// POST: /api/listings/post
async function postListing(req, res) {
  const { listname, list_type, nqf_level, description, email, stipend, location, duration, requirements, closing_date } = req.body;

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
     
        closing_date: closing_date && !isNaN(new Date(closing_date)) ? new Date(closing_date) : null,
        requirements: requirements && typeof requirements === "string" ? requirements : null,
        provider_id: user.provider.provider_id,
      },
    });

    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
// Get all listings
router.get("/all", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      include: { provider: true },
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get pending listings
router.get("/pending", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: { status: "pending" },
      include: { provider: true },
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Approve or reject a listing
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
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Delete a listing
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.listing.delete({
      where: { listings_id: parseInt(id) },
    });
    res.status(200).json({ message: "Listing deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/post", postListing);
module.exports = router;
