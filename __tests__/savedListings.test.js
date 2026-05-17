/**
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');

// 1. Mock Prisma BEFORE importing the router
jest.mock('../DB_connect/prisma', () => ({
    savedListing: {
        create: jest.fn(),
    },
}));

const prisma = require('../DB_connect/prisma');
const router = require('../backend/routes/savedListings');

// 2. Set up an isolated express app just for these tests
const app = express();
app.use(express.json());
app.use('/api/savedListings', router);

describe('POST /api/savedListings', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        // Prevent console.errors from muddying up test outputs
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    // --- TEST CASE 1: SUCCESS ---
    test('should successfully save a listing and return 201', async () => {
        const mockSavedData = { id: 1, userId: 'user-123', listingId: 42 };
        
        // Mock Prisma to simulate a successful database write
        prisma.savedListing.create.mockResolvedValue(mockSavedData);

        const response = await request(app)
            .post('/api/savedListings')
            .send({ userId: 'user-123', listingId: 42 });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: 'Listing saved successfully!',
            data: mockSavedData,
        });
        expect(prisma.savedListing.create).toHaveBeenCalledTimes(1);
        expect(prisma.savedListing.create).toHaveBeenCalledWith({
            data: { userId: 'user-123', listingId: 42 },
        });
    });

    // --- TEST CASE 2: VALIDATION FAILURE ---
    test('should return 400 if userId or listingId is missing', async () => {
        const response = await request(app)
            .post('/api/savedListings')
            .send({ userId: 'user-123' }); // Missing listingId

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Missing userId or listingId',
        });
        // Ensure Prisma was never even called
        expect(prisma.savedListing.create).not.toHaveBeenCalled();
    });

    // --- TEST CASE 3: DATABASE CRASH ---
    test('should return 500 if prisma throws an internal error', async () => {
        // Mock Prisma to simulate a database failure (e.g., connection issue)
        prisma.savedListing.create.mockRejectedValue(new Error('Database crash'));

        const response = await request(app)
            .post('/api/savedListings')
            .send({ userId: 'user-123', listingId: 42 });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: 'Internal server error while saving listing',
        });
    });
});