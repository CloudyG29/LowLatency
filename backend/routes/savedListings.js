const express = require('express');
const router = express.Router();


const prisma = require('../../DB_connect/prisma'); 

// POST route to save a listing
router.post('/', async (req, res) => {
    try {
        const { userId, listingId } = req.body;

        if (!userId || !listingId) {
            return res.status(400).json({ error: "Missing userId or listingId" });
        }

        const newSavedListing = await prisma.savedListing.create({
            data: {
                userId: userId,
                listingId: listingId
            }
        });

        res.status(201).json({ message: "Listing saved successfully!", data: newSavedListing });

    } catch (error) {
        console.error("Error saving listing to database:", error);
        res.status(500).json({ error: "Internal server error while saving listing" });
    }
});

module.exports = router;