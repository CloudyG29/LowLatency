const request = require('supertest');
const express = require('express');
const qualificationsRouter = require('../backend/routes/qualifications');

const prisma = require('../DB_connect/prisma');

jest.mock('../DB_connect/prisma', () => ({
  qualification: {
    findMany: jest.fn(),
  },
}));

describe('Qualifications Route', () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use('/api/qualifications', qualificationsRouter);
  });

  describe('GET /api/qualifications', () => {
    test('returns qualifications matching search term', async () => {
      const mockQualifications = [
        {
          qualification_id: 1,
          saqa_id: '100',
          name: 'Engineering Diploma',
          nqf_level: 6,
          sector: 'Engineering',
          originator: 'SETA',
        },
        {
          qualification_id: 2,
          saqa_id: '101',
          name: 'Engineering Certificate',
          nqf_level: 4,
          sector: 'Engineering',
          originator: 'SETA',
        },
      ];

      prisma.qualification.findMany.mockResolvedValue(mockQualifications);

      const response = await request(app)
        .get('/api/qualifications')
        .query({ search: 'engineering', limit: 20 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockQualifications);
      expect(prisma.qualification.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: 'engineering',
          },
        },
        take: 20,
        orderBy: { name: 'asc' },
        select: {
          qualification_id: true,
          saqa_id: true,
          name: true,
          nqf_level: true,
          sector: true,
          originator: true,
        },
      });
    });

    test('returns empty array when no qualifications match search', async () => {
      prisma.qualification.findMany.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/qualifications')
        .query({ search: 'nonexistent' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('uses default search and limit when not provided', async () => {
      const mockQualifications = [
        {
          qualification_id: 3,
          saqa_id: '102',
          name: 'Business Management',
          nqf_level: 5,
          sector: 'Business',
          originator: 'SETA',
        },
      ];

      prisma.qualification.findMany.mockResolvedValue(mockQualifications);

      const response = await request(app).get('/api/qualifications');

      expect(response.status).toBe(200);
      expect(prisma.qualification.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: '',
          },
        },
        take: 20,
        orderBy: { name: 'asc' },
        select: {
          qualification_id: true,
          saqa_id: true,
          name: true,
          nqf_level: true,
          sector: true,
          originator: true,
        },
      });
    });

    test('respects custom limit parameter', async () => {
      prisma.qualification.findMany.mockResolvedValue([]);

      await request(app)
        .get('/api/qualifications')
        .query({ limit: 50 });

      expect(prisma.qualification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 50,
        })
      );
    });

    test('returns 500 error when database query fails', async () => {
      prisma.qualification.findMany.mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await request(app).get('/api/qualifications');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch qualifications' });
    });
  });

  describe('GET /api/qualifications/nqf-levels', () => {
    test('returns distinct NQF levels sorted in ascending order', async () => {
      const mockLevels = [
        { nqf_level: 1 },
        { nqf_level: 4 },
        { nqf_level: 6 },
        { nqf_level: 8 },
      ];

      prisma.qualification.findMany.mockResolvedValue(mockLevels);

      const response = await request(app).get('/api/qualifications/nqf-levels');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([1, 4, 6, 8]);
      expect(prisma.qualification.findMany).toHaveBeenCalledWith({
        select: { nqf_level: true },
        distinct: ['nqf_level'],
        orderBy: { nqf_level: 'asc' },
      });
    });

    test('filters out null NQF levels', async () => {
      const mockLevels = [
        { nqf_level: 4 },
        { nqf_level: null },
        { nqf_level: 6 },
      ];

      prisma.qualification.findMany.mockResolvedValue(mockLevels);

      const response = await request(app).get('/api/qualifications/nqf-levels');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([4, 6]);
    });

    test('returns empty array when no NQF levels exist', async () => {
      prisma.qualification.findMany.mockResolvedValue([]);

      const response = await request(app).get('/api/qualifications/nqf-levels');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('returns 500 error when database query fails', async () => {
      prisma.qualification.findMany.mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app).get('/api/qualifications/nqf-levels');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch NQF levels' });
    });
  });
});
