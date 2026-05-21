/**
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');

// Mock Prisma BEFORE importing the router module
jest.mock('../DB_connect/prisma', () => ({
    savedListing: {
        create: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
    },
}));

const prisma = require('../DB_connect/prisma');
const router = require('../backend/routes/savedListings'); // Ensure this matches your route path

const app = express();
app.use(express.json());
app.use('/api/savedListings', router);

describe('Saved Listings Backend Router Backend Target Coverage', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        // Squelch expected console errors to keep clean command lines
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    describe('POST /api/savedListings (Toggle Save Functionality)', () => {
        
        test('should return 400 if userId or listingId parameter is missing completely', async () => {
            const response = await request(app)
                .post('/api/savedListings')
                .send({ userId: 'user-789' }); // Missing listingId parameter

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Missing userId or listingId' });
            expect(prisma.savedListing.findFirst).not.toHaveBeenCalled();
        });

        test('should execute TOGGLE ON (create) if no existing record is found', async () => {
            prisma.savedListing.findFirst.mockResolvedValue(null);
            prisma.savedListing.create.mockResolvedValue({ id: 10, userId: 'user-123', listingId: 42 });

            const response = await request(app)
                .post('/api/savedListings')
                .send({ userId: 'user-123', listingId: 42 });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: "Listing saved successfully",
                isSaved: true
            });
            expect(prisma.savedListing.create).toHaveBeenCalledWith({
                data: { userId: 'user-123', listingId: 42 }
            });
        });

        test('should execute TOGGLE OFF (delete) if an existing database save record matches', async () => {
            const mockExistingRow = { id: 99, userId: 'user-123', listingId: 42 };
            prisma.savedListing.findFirst.mockResolvedValue(mockExistingRow);
            prisma.savedListing.delete.mockResolvedValue(mockExistingRow);

            const response = await request(app)
                .post('/api/savedListings')
                .send({ userId: 'user-123', listingId: 42 });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Listing unsaved successfully",
                isSaved: false
            });
            expect(prisma.savedListing.delete).toHaveBeenCalledWith({
                where: { id: 99 }
            });
        });

        test('should gracefully capture exceptions and return status 500 when database failures arise', async () => {
            prisma.savedListing.findFirst.mockRejectedValue(new Error('Read lock operational error'));

            const response = await request(app)
                .post('/api/savedListings')
                .send({ userId: 'user-123', listingId: 42 });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'An error occurred while saving the listing' });
        });
    });

    describe('GET /api/savedListings/:userId (Fetch User Save Logs)', () => {
        
        test('should return 200 containing an array of matched user save entries', async () => {
            const mockRows = [
                { id: 1, userId: 'user-123', listingId: 101 },
                { id: 2, userId: 'user-123', listingId: 102 }
            ];
            prisma.savedListing.findMany.mockResolvedValue(mockRows);

            const response = await request(app).get('/api/savedListings/user-123');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRows);
            expect(prisma.savedListing.findMany).toHaveBeenCalledWith({
                where: { userId: 'user-123' }
            });
        });

        test('should catch database fetch errors and revert with a status 500 failure message', async () => {
            prisma.savedListing.findMany.mockRejectedValue(new Error('Connection dropped unexpectedly'));

            const response = await request(app).get('/api/savedListings/user-123');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch saved listings' });
        });
    });
});