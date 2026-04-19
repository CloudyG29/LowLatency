// backend/routes/user.js
const express = require('express');
const router = express.Router();
const prisma = require('../../DB_connect/prisma');

// POST: /api/user/register
async function registerUser(req, res) {
    const { name, surname, email, role, firebase_uid } = req.body;

    try {
        // 1. Check if the user already exists to prevent duplicate entry errors
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists in the database." });
        }

        // 2. Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                role,
                firebase_uid
            }
        });

        // 3. Handle the Provider Profile
       
        if (role === 'Provider') {
            await prisma.provider.create({
                data: {
                    user_id: newUser.user_id,
                    provider_name: `${name} ${surname}`, 
                    profile: "New Provider Account" 
                }
            });
        }

        console.log(`Successfully registered ${role}: ${email}`);
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Prisma Error during registration:", error);
        console.error("Error details:", error.message, error.code);
        res.status(500).json({ 
            error: "Internal server error while saving to the database.",
            details: error.message // Include actual error for debugging
        });
    }
}


async function getUserRole(req, res) {
    const { email } = req.query;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { role: true } 
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ role: user.role });
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

router.post('/register', registerUser);
router.get('/role', getUserRole);

router.registerUser = registerUser;
router.getUserRole = getUserRole;

module.exports = router;