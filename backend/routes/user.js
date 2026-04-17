const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Register user in Prisma DB
router.post("/register", async (req, res) => {
    const { name, surname, email, role, firebase_uid } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                role,
                firebase_uid
            }
        });

        // If the user is a provider, create a provider profile too
        if (role === "Provider") {
            await prisma.provider.create({
                data: {
                    provider_name: `${name} ${surname}`,
                    user_id: user.user_id
                }
            });
        }

        res.status(201).json(user);
    } catch (error) {
        console.error("Register error:", error);
        res.status(400).json({ error: "User already exists or data is invalid" });
    }
});

// Get user role by email
router.get("/role", async (req, res) => {
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).json({ error: "Email parameter is required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
            select: {
                role: true,
                firebase_uid: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found in database" });
        }

        res.status(200).json({
            role: user.role,
            firebase_uid: user.firebase_uid
        });

    } catch (error) {
        console.error("Database error fetching role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;