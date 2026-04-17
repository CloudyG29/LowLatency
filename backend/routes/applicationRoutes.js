const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get applications for the logged-in provider using firebase UID
router.get("/provider/:firebaseUid", async (req, res) => {
  const firebaseUid = req.params.firebaseUid;

  try {
    const user = await prisma.user.findUnique({
      where: { firebase_uid: firebaseUid }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const provider = await prisma.provider.findUnique({
      where: { user_id: user.user_id }
    });

    if (!provider) {
      return res.status(404).json({ error: "Provider profile not found" });
    }

    const applications = await prisma.application.findMany({
      where: { provider_id: provider.provider_id },
      include: {
        user: true,
        listing: true
      }
    });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching provider applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update application status
router.patch("/:id", async (req, res) => {
  const applicationId = parseInt(req.params.id, 10);
  const { status } = req.body;

  try {
    const updatedApplication = await prisma.application.update({
      where: { application_id: applicationId },
      data: { status }
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

module.exports = router;