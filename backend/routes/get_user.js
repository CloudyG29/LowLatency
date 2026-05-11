const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

// Function to get all users
async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

// Function to get user by email
async function getUserByEmail(req, res) {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required." });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/* =========================
   GET ALL USERS (ROUTE)
========================= */
router.get("/users", getUsers);

/* =========================
   GET USER BY EMAIL (ROUTE)
========================= */
router.get("/user-by-email", getUserByEmail);

/* =========================
   GET PROVIDERS ONLY
========================= */
router.get("/providers", async (req, res) => {
  try {
    const providers = await prisma.user.findMany({
      where: { role: "Provider" },
    });
    return res.json(providers);
  } catch (error) {
    console.error("Error fetching providers:", error);
    return res.status(500).json({ error: "Internal server error." });
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
    return res.json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Export both the router AND the functions for testing
module.exports = router;
module.exports.getUsers = getUsers;
module.exports.getUserByEmail = getUserByEmail;