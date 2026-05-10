const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

/* =========================
   GET ALL USERS
========================= */
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   GET PROVIDERS ONLY
========================= */
router.get("/providers", async (req, res) => {
  try {
    const providers = await prisma.user.findMany({
      where: { role: "Provider" },
    });
    res.json(providers);
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* =========================
   GET APPLICANTS ONLY
========================= */
router.get("/applicants", async (req, res) => {
  try {
    const applicants = await prisma.user.findMany({
      where: { role: "Applicant" },
    });
    res.json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;