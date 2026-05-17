const express = require('express');
const router = express.Router();


const prisma = require('../../DB_connect/prisma'); 

// POST route to save a listing
router.post('/', async (req, res) => {
    const { userId, listingId } = req.body;

    if (!userId || !listingId) {
        return res.status(400).json({ error: "Missing userId or listingId" });
    }

    try {
        // 1. Check if the user has ALREADY saved this specific listing
        const existingSave = await prisma.savedListing.findFirst({
            where: {
                userId: userId,
                listingId: listingId
            }
        });
    
        if (existingSave) {
            // 2. TOGGLE OFF: The record exists, so the user is trying to "un-save" it.
            // We delete the existing record. (Make sure 'id' matches your schema's primary key)
            await prisma.savedListing.delete({
                where: { 
                    id: existingSave.id 
                }
            });
            
            return res.status(200).json({ 
                message: "Listing unsaved successfully", 
                isSaved: false 
            });
    
        } else {
            // 3. TOGGLE ON: The record does not exist, so we create it safely!
            const newSavedListing = await prisma.savedListing.create({
                data: {
                    userId: userId,
                    listingId: listingId
                }
            });
            
            return res.status(201).json({ 
                message: "Listing saved successfully", 
                isSaved: true 
            });
        }
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "An error occurred while saving the listing" });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const savedListings = await prisma.savedListing.findMany({
            where: { userId: userId }
        });
        
        return res.status(200).json(savedListings);
    } catch (error) {
        console.error("Error fetching saved listings:", error);
        return res.status(500).json({ error: "Failed to fetch saved listings" });
    }
});

module.exports = router;