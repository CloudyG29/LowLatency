/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const express = require('express');

jest.mock('../DB_connect/prisma', () => ({
  qualification: {
    findMany: jest.fn(),
  },
}));

const prisma = require('../DB_connect/prisma');
const qualificationsRouter = require('../backend/routes/qualifications');

const app = express();
app.use(express.json());
app.use('/api/qualifications', qualificationsRouter);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Qualifications API', () => {
  describe('GET /api/qualifications', () => {
    test('returns qualifications matching search query', async () => {
      prisma.qualification.findMany.mockResolvedValue([
        {
          qualification_id: 1,
          saqa_id: '123456',
          name: 'Engineering',
          nqf_level: 5,
          sector: 'Engineering',
          originator: 'SAQA',
        },
      ]);

      const res = await request(app).get('/api/qualifications').query({ search: 'engineer', limit: '10' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].name).toBe('Engineering');
      expect(prisma.qualification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: expect.objectContaining({ contains: 'engineer' }),
          }),
          take: 10,
          orderBy: { name: 'asc' },
        }),
      );
    });

    test('returns 500 when qualification query fails', async () => {
      prisma.qualification.findMany.mockRejectedValue(new Error('DB failure'));

      const res = await request(app).get('/api/qualifications');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Failed to fetch qualifications');
    });
  });

  describe('GET /api/qualifications/nqf-levels', () => {
    test('returns distinct NQF levels', async () => {
      prisma.qualification.findMany.mockResolvedValue([
        { nqf_level: 1 },
        { nqf_level: 4 },
        { nqf_level: 5 },
      ]);

      const res = await request(app).get('/api/qualifications/nqf-levels');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([1, 4, 5]);
      expect(prisma.qualification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: { nqf_level: true },
          distinct: ['nqf_level'],
          orderBy: { nqf_level: 'asc' },
        }),
      );
    });

    test('returns 500 when NQF lookup fails', async () => {
      prisma.qualification.findMany.mockRejectedValue(new Error('DB failure'));

      const res = await request(app).get('/api/qualifications/nqf-levels');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Failed to fetch NQF levels');
    });
  });

  describe('GET /api/qualifications/sectors', () => {
    test('returns matching sectors', async () => {
      prisma.qualification.findMany.mockResolvedValue([
        { sector: 'Information Technology' },
        { sector: 'Information Systems' },
      ]);

      const res = await request(app).get('/api/qualifications/sectors').query({ search: 'information' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(['Information Technology', 'Information Systems']);
      expect(prisma.qualification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            sector: expect.objectContaining({ contains: 'information' }),
          }),
          distinct: ['sector'],
          select: { sector: true },
          orderBy: { sector: 'asc' },
        }),
      );
    });

    test('returns 500 when sector lookup fails', async () => {
      prisma.qualification.findMany.mockRejectedValue(new Error('DB failure'));

      const res = await request(app).get('/api/qualifications/sectors');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Failed to fetch sectors');
    });
  });
});
