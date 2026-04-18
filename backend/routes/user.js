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

        // 2. Create the user and provider profile atomically so partial registration cannot occur.
        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    surname,
                    email,
                    role,
                    firebase_uid
                }
            });

            if (role === 'Provider') {
                await tx.provider.create({
                    data: {
                        user_id: user.user_id,
                        provider_name: `${name} ${surname}`,
                        profile: "New Provider Account",
                        onboarded: false
                    }
                });
            }

            return user;
        });

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

// POST: /api/user/complete-onboarding
async function completeProviderOnboarding(req, res) {
    const { email, provider_name, profile } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: { provider: true }
        });

        if (!user || user.role !== 'Provider' || !user.provider) {
            return res.status(404).json({ error: "Provider not found" });
        }

        await prisma.provider.update({
            where: { provider_id: user.provider.provider_id },
            data: {
                provider_name,
                profile: profile || user.provider.profile,
                onboarded: true
            }
        });

        res.status(200).json({ message: "Onboarding completed successfully" });
    } catch (error) {
        console.error("Error completing onboarding:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

// GET: /api/user/role?email=...
async function getUserRole(req, res) {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: "Missing email query parameter." });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ role: user.role });
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

// GET: /api/user/provider-onboarded?email=...
async function getProviderOnboarded(req, res) {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: "Missing email query parameter." });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { provider: true }
        });

        if (!user || user.role !== 'Provider' || !user.provider) {
            return res.status(404).json({ error: "Provider not found." });
        }

        res.status(200).json({
            onboarded: user.provider.onboarded,
            provider_name: user.provider.provider_name ? user.provider.provider_name.trim() : "",
            profile: user.provider.profile || ""
        });
    } catch (error) {
        console.error("Error checking provider onboarding status:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

router.post('/register', registerUser);
router.get('/role', getUserRole);
router.get('/provider-onboarded', getProviderOnboarded);
router.post('/complete-onboarding', completeProviderOnboarding);

router.registerUser = registerUser;
router.getUserRole = getUserRole;
router.getProviderOnboarded = getProviderOnboarded;
router.completeProviderOnboarding = completeProviderOnboarding;

module.exports = router;