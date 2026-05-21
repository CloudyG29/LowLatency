/**
 * @jest-environment node
 */

// Polyfills must reside at the top of the execution block
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const express = require('express');

// 1. Setup mock engine for Prisma schema models
jest.mock('../DB_connect/prisma', () => ({
  report: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const prisma = require('../DB_connect/prisma');
const router = require('../backend/routes/reports'); // Adjust path to match your folder hierarchy

// 2. Instantiate an isolated Express environment to eliminate app setup noise
const app = express();
app.use(express.json());
app.use('/api/reports', router);

describe('Reports API Endpoint Suite (Comprehensive Coverage)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // Silence intentional console logging to maintain clean terminal outputs
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.warn.mockRestore();
  });

  // ==========================================
  // 1. GET /api/reports/check
  // ==========================================
  describe('GET /api/reports/check - Check duplicate report status', () => {
    
    test('should return hasReported = false if user has not reported', async () => {
      prisma.report.findFirst.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/reports/check')
        .query({ listing_id: 100, email: 'user@test.com' });

      expect(response.status).toBe(200);
      expect(response.body.hasReported).toBe(false);
    });

    test('should return hasReported = true if user already reported', async () => {
      prisma.report.findFirst.mockResolvedValue({ report_id: 1 });

      const response = await request(app)
        .get('/api/reports/check')
        .query({ listing_id: 100, email: 'user@test.com' });

      expect(response.status).toBe(200);
      expect(response.body.hasReported).toBe(true);
    });

    test('should return 400 if listing_id or email query parameter is missing', async () => {
      const response = await request(app)
        .get('/api/reports/check')
        .query({ listing_id: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing listing_id or email');
    });

    test('should return 500 when database lookup hits an operational exception', async () => {
      prisma.report.findFirst.mockRejectedValue(new Error('Connection failure'));

      const response = await request(app)
        .get('/api/reports/check')
        .query({ listing_id: 100, email: 'user@test.com' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to check report status');
    });
  });

  // ==========================================
  // 2. POST /api/reports
  // ==========================================
  describe('POST /api/reports - Submit a report entry', () => {
    
    test('should create report when all required fields are validated', async () => {
      prisma.report.create.mockResolvedValue({
        report_id: 1, listing_id: 100, reason: 'Fake / Scam', details: 'Suspicious info', reported_by: 'user@test.com'
      });

      const response = await request(app)
        .post('/api/reports')
        .send({ listing_id: 100, reason: 'Fake / Scam', details: 'Suspicious info', reported_by: 'user@test.com' });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Report submitted');
    });

    test('should return 400 if explicit textual details parameter is empty or whitespace only', async () => {
      const response = await request(app)
        .post('/api/reports')
        .send({ listing_id: 100, reason: 'Fake / Scam', details: '   ', reported_by: 'user@test.com' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Please provide details for your report.');
    });

    test('should return 400 if structural parameters like reason are missing', async () => {
      const response = await request(app)
        .post('/api/reports')
        .send({ listing_id: 100, details: 'Some details', reported_by: 'user@test.com' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });

    test('should return 500 when insert operations prompt internal system failures', async () => {
      prisma.report.create.mockRejectedValue(new Error('Write constraints lock error'));

      const response = await request(app)
        .post('/api/reports')
        .send({ listing_id: 100, reason: 'Spam', details: 'Valid text details', reported_by: 'user@test.com' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to submit report');
    });
  });

  // ==========================================
  // 3. GET /api/reports
  // ==========================================
  describe('GET /api/reports - Retrieve master reports data feed', () => {
    
    test('should cleanly resolve complete records alongside full context inclusion sets', async () => {
      const mockReports = [
        { report_id: 1, reason: 'Spam', Listing: { listname: 'Job 1', provider: { provider_name: 'HQ' } } }
      ];
      prisma.report.findMany.mockResolvedValueOnce(mockReports);

      const response = await request(app).get('/api/reports');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    test('should run fallback query sequence if primary model table inclusions prompt missing relation faults', async () => {
      // Branch 1: Inclusions fail due to relation gaps
      prisma.report.findMany.mockRejectedValueOnce(new Error('Relation structural parsing error'));
      // Branch 2: Fallback lookup executes successfully
      prisma.report.findMany.mockResolvedValueOnce([{ report_id: 2, reason: 'Fallback text data execution content' }]);

      const response = await request(app).get('/api/reports');

      expect(response.status).toBe(200);
      expect(response.body[0].reason).toBe('Fallback text data execution content');
      expect(prisma.report.findMany).toHaveBeenCalledTimes(2);
    });

    test('should crash with 500 status response if basic fallback query operations fail consecutively', async () => {
      prisma.report.findMany.mockRejectedValueOnce(new Error('Primary table check fault'));
      prisma.report.findMany.mockRejectedValueOnce(new Error('Isolated schema fallback crash'));

      const response = await request(app).get('/api/reports');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to fetch reports');
    });
  });

  // ==========================================
  // 4. GET /api/reports/:id
  // ==========================================
  describe('GET /api/reports/:id - Fetch distinct individual entry metadata', () => {
    
    test('should return matching targeted row payload when entry match runs validly', async () => {
      prisma.report.findUnique.mockResolvedValue({ report_id: 45, reason: 'Fake / Scam' });

      const response = await request(app).get('/api/reports/45');

      expect(response.status).toBe(200);
      expect(response.body.report_id).toBe(45);
    });

    test('should respond with 404 error parameters if target row query returns empty response values', async () => {
      prisma.report.findUnique.mockResolvedValue(null);

      const response = await request(app).get('/api/reports/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Report not found');
    });

    test('should bubble 500 error parameters if core operations prompt parsing exceptions', async () => {
      prisma.report.findUnique.mockRejectedValue(new Error('Corrupt packet data line trace'));

      const response = await request(app).get('/api/reports/12');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to fetch report');
    });
  });

  // ==========================================
  // 5. PATCH /api/reports/:id/status
  // ==========================================
  describe('PATCH /api/reports/:id/status - Mutate system workflow states', () => {
    
    test('should apply target updates and acknowledge process execution transitions smoothly', async () => {
      prisma.report.update.mockResolvedValue({ report_id: 1, status: 'resolved' });

      const response = await request(app)
        .patch('/api/reports/1/status')
        .send({ status: 'resolved' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('resolved');
    });

    test('should fail with status code 500 if database writes encounter an unhandled rejection error', async () => {
      prisma.report.update.mockRejectedValue(new Error('Database write exception constraints validation failure'));

      const response = await request(app)
        .patch('/api/reports/1/status')
        .send({ status: 'dismissed' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to update report');
    });
  });

  // ==========================================
  // 6. DELETE /api/reports/:id
  // ==========================================
  describe('DELETE /api/reports/:id - Hard drop record operations permanently', () => {
    
    test('should execute targeted deletion process flow routines accurately and return 200', async () => {
      prisma.report.delete.mockResolvedValue({ report_id: 77 });

      const response = await request(app).delete('/api/reports/77');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Report deleted successfully');
      expect(prisma.report.delete).toHaveBeenCalledWith({
        where: { report_id: 77 }
      });
    });

    test('should catch backend failures cleanly and serve explicit failure states back to the client', async () => {
      prisma.report.delete.mockRejectedValue(new Error('Record target trace not found inside workspace index rows'));

      const response = await request(app).delete('/api/reports/77');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to delete report');
      expect(response.body.details).toBe('Record target trace not found inside workspace index rows');
    });
  });
});