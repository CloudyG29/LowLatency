/**
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');
const prisma = require('../DB_connect/prisma');

// Import your router (Adjust this path if your file is named something else)
const qualificationsRouter = require('../backend/routes/qualifications'); 

// 1. Mock Prisma Client
jest.mock('../DB_connect/prisma', () => ({
  qualification: {
    findMany: jest.fn(),
  },
}));

// 2. Setup a dummy Express app for Supertest to use
const app = express();
app.use(express.json());
app.use('/api/qualifications', qualificationsRouter);

describe('Qualifications API Router', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    // Spy on console.error so our expected 500 errors don't pollute the test terminal
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // --- GET /api/qualifications ---
  describe('GET /', () => {
    test('should fetch qualifications with default parameters', async () => {
      const mockData = [
        { qualification_id: 1, name: 'BSc Computer Science', nqf_level: 7 },
        { qualification_id: 2, name: 'National Diploma', nqf_level: 6 }
      ];
      prisma.qualification.findMany.mockResolvedValue(mockData);

      const response = await request(app).get('/api/qualifications');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      
      // Verify default fallback parameters were used
      expect(prisma.qualification.findMany).toHaveBeenCalledWith({
        where: { name: { contains: '' } },
        take: 20,
        orderBy: { name: 'asc' },
        select: expect.any(Object)
      });
    });

    test('should apply custom search and limit query parameters', async () => {
      prisma.qualification.findMany.mockResolvedValue([]);

      const response = await request(app).get('/api/qualifications?search=engineering&limit=5');

      expect(response.status).toBe(200);
      
      // Verify custom parameters were passed to Prisma
      expect(prisma.qualification.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { name: { contains: 'engineering' } },
        take: 5
      }));
    });

    test('should return a 500 error if the database query fails', async () => {
      prisma.qualification.findMany.mockRejectedValue(new Error('Database offline'));

      const response = await request(app).get('/api/qualifications');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch qualifications' });
      expect(consoleErrorSpy).toHaveBeenCalled(); // Prove the error was logged
    });
  });

  // --- GET /api/qualifications/nqf-levels ---
  describe('GET /nqf-levels', () => {
    test('should return a filtered list of distinct NQF levels', async () => {
      // Notice we include a null value to ensure the `.filter(Boolean)` logic is working!
      const mockLevels = [
        { nqf_level: 5 },
        { nqf_level: 6 },
        { nqf_level: null },
        { nqf_level: 7 }
      ];
      prisma.qualification.findMany.mockResolvedValue(mockLevels);

      const response = await request(app).get('/api/qualifications/nqf-levels');

      expect(response.status).toBe(200);
      // It should map out the objects and drop the null value
      expect(response.body).toEqual([5, 6, 7]); 
      
      expect(prisma.qualification.findMany).toHaveBeenCalledWith({
        select: { nqf_level: true },
        distinct: ['nqf_level'],
        orderBy: { nqf_level: 'asc' }
      });
    });

    test('should return a 500 error if fetching NQF levels fails', async () => {
      prisma.qualification.findMany.mockRejectedValue(new Error('Timeout'));

      const response = await request(app).get('/api/qualifications/nqf-levels');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch NQF levels' });
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
