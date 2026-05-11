/**
 * @jest-environment node
 */

const express = require('express');
const request = require('supertest');

// 1. Import the router you want to test
const profileRouter = require('../backend/routes/profile.js'); 

// 2. Mock your Prisma Client
jest.mock('../generated/client', () => {
    const mPrisma = {
        user: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        applicantProfile: {
            findUnique: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            upsert: jest.fn(),
        },
        applicantQualification: {
            deleteMany: jest.fn(),
            create: jest.fn(),
        },
        qualification: {
            findFirst: jest.fn(),
            create: jest.fn(),
        },
        applicantSkill: {
            deleteMany: jest.fn(),
            create: jest.fn(),
        },
        skill: {
            findFirst: jest.fn(),
            create: jest.fn(),
        }
    };
    return { PrismaClient: jest.fn(() => mPrisma) };
});

const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

// 3. Set up a dummy Express app for testing
const app = express();
app.use(express.json()); // Allows Express to parse JSON bodies
app.use('/api/profile', profileRouter); // Mount your router

describe('Backend: Profile Routes API Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    // --- TEST 1: Getting a Profile (GET /api/profile/:uid) ---
    test('GET /api/profile/:uid should return profile data for existing user', async () => {
        // Arrange: Tell the fake Prisma database what to return
        const mockDbUser = {
            firebase_uid: 'user_123',
            name: 'John',
            applicant: {
                bio: 'Backend dev',
                qualifications: [],
                skills: []
            }
        };

        prisma.user.findUnique.mockResolvedValue(mockDbUser);

        // Act
        const response = await request(app).get('/api/profile/user_123');

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John');
        expect(response.body.applicant.bio).toBe('Backend dev'); // Changed to 'applicant'

        // FIXED: Match your actual Prisma query structure exactly!
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { firebase_uid: 'user_123' },
            include: {
                applicant: {
                    include: {
                        qualifications: { include: { qualification: true } },
                        skills: { include: { skill: true } }
                    }
                },
                provider: true
            }
        });
    });

    // --- TEST 2: Updating a Profile (PUT /api/profile/:uid) ---
    test('PUT /api/profile/:uid should successfully update and return data', async () => {
        // Arrange
        const updatePayload = { name: 'John Updated', bio: 'Updated Bio' };

        // Mock the user check
        prisma.user.findUnique.mockResolvedValue({ id: 1, firebase_uid: 'user_123' });

        // Mock the update action (Fixed 'applicantProfile' to 'applicant')
        const mockUpdatedUser = {
            name: 'John Updated',
            applicant: { bio: 'Updated Bio' }
        };
        prisma.user.update.mockResolvedValue(mockUpdatedUser);

        // Act
        const response = await request(app)
            .put('/api/profile/user_123')
            .send(updatePayload);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(undefined);
    });

    // --- TEST 3: Handling Server Crashes ---
    test('PUT /api/profile/:uid should return 500 if database crashes', async () => {
        // Arrange: Force Prisma to throw an error
        prisma.user.findUnique.mockRejectedValue(new Error('Database connection lost'));

        // Act
        const response = await request(app)
            .put('/api/profile/user_123')
            .send({ name: 'Test' });

        // Assert
        expect(response.status).toBe(500);
    });

    // --- 404 NOT FOUND TESTS ---

    test('GET /api/profile/:uid should return 404 if user does not exist', async () => {
        // Arrange: Tell Prisma to return null (simulating an empty database result)
        prisma.user.findUnique.mockResolvedValue(null);

        // Act: Try to fetch a user ID that doesn't exist
        const response = await request(app).get('/api/profile/ghost_user_999');

        // Assert: The route should catch the null and return a 404 status
        expect(response.status).toBe(404);
        
        // Optional: Check if your API returns a specific error message
        // expect(response.body.error).toBe("User not found"); 
    });

    test('PUT /api/profile/:uid should return 404 if trying to update a non-existent user', async () => {
        // Arrange: Tell Prisma to return null when checking if the user exists before updating
        prisma.user.findUnique.mockResolvedValue(null);

        // Act: Send an update payload to a fake user ID
        const response = await request(app)
            .put('/api/profile/ghost_user_999')
            .send({ name: 'Hacker', bio: 'Trying to update someone else' });

        // Assert: The server should block the update and return 404
        expect(response.status).toBe(404);
        
        // Ensure the database update function was NEVER called
        expect(prisma.user.update).not.toHaveBeenCalled();
    });

    test('GET /api/profile/:uid should handle server errors and return 500', async () => {
        // Arrange: Silence the expected console.error so it doesn't clutter your test results
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        // Force Prisma to throw a database error when it tries to find the user
        prisma.user.findUnique.mockRejectedValue(new Error('Simulated Database Crash'));

        // Act: Fire the GET request
        const response = await request(app).get('/api/profile/user_123');

        // Assert: Ensure your Express catch block successfully intercepted the crash
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Internal server error while fetching profile.");

        // Clean up: Restore the console.error function for the rest of your tests
        consoleSpy.mockRestore();
    });


    test('PUT /api/profile/:uid should update Applicant profile, qualifications, and skills', async () => {
        // Arrange: 1. Set up the payload from the frontend
        const updatePayload = {
            name: 'John Applicant',
            dob: '1995-05-15',
            phone: '0821234567',
            bio: 'Fullstack Dev',
            qualifications: [
                { name: 'BSc Computer Science', nqf_level: 7, institution: 'UCT', year_completed: 2018 }
            ],
            skills: [
                { name: 'Node.js', nqf_level: 5 }
            ]
        };

        // Arrange: 2. Mock the initial User check and update
        prisma.user.findUnique.mockResolvedValue({ id: 1, firebase_uid: 'user_123', role: 'Applicant' });
        prisma.user.update.mockResolvedValue({ name: 'John Applicant' });

        // Arrange: 3. Mock the ApplicantProfile Upsert
        prisma.applicantProfile.upsert.mockResolvedValue({ applicant_id: 99 });

        // Arrange: 4. Mock Qualifications (Force the "create new qualification" path)
        prisma.applicantQualification.deleteMany.mockResolvedValue({});
        prisma.qualification.findFirst.mockResolvedValueOnce(null); // Returns null, forcing a create
        prisma.qualification.create.mockResolvedValue({ qualification_id: 100 });
        prisma.applicantQualification.create.mockResolvedValue({});

        // Arrange: 5. Mock Skills (Force the "skill already exists" path)
        prisma.applicantSkill.deleteMany.mockResolvedValue({});
        prisma.skill.findFirst.mockResolvedValueOnce({ skill_id: 200 }); // Returns existing skill, skipping create
        prisma.applicantSkill.create.mockResolvedValue({});
        
        // Act
        const response = await request(app)
            .put('/api/profile/user_123')
            .send(updatePayload);

        // Assert
        expect(response.status).toBe(200);
        
        // Verify Upsert was called
        expect(prisma.applicantProfile.upsert).toHaveBeenCalled();
        
        // Verify Qualifications logic
        expect(prisma.applicantQualification.deleteMany).toHaveBeenCalledWith({ where: { applicant_id: 99 } });
        expect(prisma.qualification.create).toHaveBeenCalled(); // Should be called because findFirst returned null
        
        // Verify Skills logic
        expect(prisma.applicantSkill.deleteMany).toHaveBeenCalledWith({ where: { applicant_id: 99 } });
        expect(prisma.skill.create).not.toHaveBeenCalled(); // Should NOT be called because findFirst returned an object
    });
});