// backend/routes/user.js 
const authenticate = require('../middleware/auth');
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
    return res.status(200).json({
        message: "User already exists in the database.",
        user: existingUser
    });
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
        // According to your schema, if the user is a Provider, they need a corresponding Provider record
        if (role === 'Provider') {
            await prisma.provider.create({
                data: {
                    user_id: newUser.user_id,
                    provider_name: `${name} ${surname}`, // You can update this later via a profile edit page
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

// GET: /api/user/role?email=...
// You also have a fetch for this in your loginAndRedirect function!
async function getUserRole(req, res) {
    try {
        const firebaseUid = req.user.uid;
        const email = req.user.email;

        // 1. First try finding user by firebase UID
        let user = await prisma.user.findUnique({
            where: { firebase_uid: firebaseUid },
            select: {
                user_id: true,
                role: true,
                email: true,
                name: true,
                surname: true,
                firebase_uid: true
            }
        });

        // 2. If not found by UID, try email
        if (!user && email) {
            user = await prisma.user.findUnique({
                where: { email: email },
                select: {
                    user_id: true,
                    role: true,
                    email: true,
                    name: true,
                    surname: true,
                    firebase_uid: true
                }
            });

            // 3. If found by email, sync the firebase UID
            if (user && user.firebase_uid !== firebaseUid) {
                await prisma.user.update({
                    where: { user_id: user.user_id },
                    data: { firebase_uid: firebaseUid }
                });

                user.firebase_uid = firebaseUid;
            }
        }

        if (!user) {
            return res.status(404).json({ error: "User not found in database" });
        }

        res.status(200).json({
            role: user.role,
            email: user.email,
            name: user.name,
            surname: user.surname
        });
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

router.post('/register', registerUser);
router.get('/role', authenticate, getUserRole);

router.registerUser = registerUser;
router.getUserRole = getUserRole;

module.exports = router;