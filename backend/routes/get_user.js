const express = require("express");
const router = express.Router();
const prisma = require("../../DB_connect/prisma");

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

async function getUserByEmail(req, res) {
  const { email } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email query parameter is required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

router.get("/users", getUsers);
router.get("/", getUserByEmail);

router.getUsers = getUsers;
router.getUserByEmail = getUserByEmail;

module.exports = router;
