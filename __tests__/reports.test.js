// Polyfill MUST be at the very top before any imports
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const app = require('../backend/index');
const prisma = require('../DB_connect/prisma');

jest.mock('../DB_connect/prisma', () => ({
  report: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  listing: {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateMany: jest.fn(),
  },
  application: {
    deleteMany: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
  },
  provider: {
    findUnique: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Reports API', () => {

  describe('GET /api/reports/check - Check if user already reported', () => {
    
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

    test('should return 400 if listing_id or email missing', async () => {
      const response = await request(app)
        .get('/api/reports/check')
        .query({ listing_id: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing listing_id or email');
    });
  });

  describe('POST /api/reports - Submit a report', () => {
    
    test('should create report when all required fields are provided (details required)', async () => {
      prisma.report.create.mockResolvedValue({
        report_id: 1,
        listing_id: 100,
        reason: 'Fake / Scam',
        details: 'This listing looks suspicious',
        reported_by: 'user@test.com',
        status: 'pending'
      });

      const response = await request(app)
        .post('/api/reports')
        .send({
          listing_id: 100,
          reason: 'Fake / Scam',
          details: 'This listing looks suspicious',
          reported_by: 'user@test.com'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Report submitted');
      expect(response.body.report).toHaveProperty('report_id');
    });

    test('should return 400 if details is empty (details is required)', async () => {
      const response = await request(app)
        .post('/api/reports')
        .send({
          listing_id: 100,
          reason: 'Fake / Scam',
          details: '   ',
          reported_by: 'user@test.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Please provide details for your report.');
    });

    test('should return 400 if reason is missing', async () => {
      const response = await request(app)
        .post('/api/reports')
        .send({
          listing_id: 100,
          details: 'Some details',
          reported_by: 'user@test.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });

    test('should return 400 if listing_id is missing', async () => {
      const response = await request(app)
        .post('/api/reports')
        .send({
          reason: 'Spam',
          details: 'Spam content',
          reported_by: 'user@test.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });

    test('should return 400 if reported_by is missing', async () => {
      const response = await request(app)
        .post('/api/reports')
        .send({
          listing_id: 100,
          reason: 'Spam',
          details: 'Spam content'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });
  });

  describe('GET /api/reports - Get all reports (admin view)', () => {
    
    test('should return all reports with listing and provider info', async () => {
      const mockReports = [
        {
          report_id: 1,
          reason: 'Fake / Scam',
          details: 'Fake company',
          status: 'pending',
          reported_by: 'user1@test.com',
          created_at: new Date(),
          listing: { listname: 'Job 1', provider: { provider_name: 'Company A' } }
        },
        {
          report_id: 2,
          reason: 'Spam',
          details: 'Spam listing',
          status: 'resolved',
          reported_by: 'user2@test.com',
          created_at: new Date(),
          listing: { listname: 'Job 2', provider: { provider_name: 'Company B' } }
        }
      ];

      prisma.report.findMany.mockResolvedValue(mockReports);

      const response = await request(app).get('/api/reports');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('reason');
      expect(response.body[0]).toHaveProperty('details');
      expect(response.body[0]).toHaveProperty('status');
    });

    test('should return empty array if no reports exist', async () => {
      prisma.report.findMany.mockResolvedValue([]);

      const response = await request(app).get('/api/reports');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('GET /api/reports/:id - Get single report', () => {
    
    test('should return report with listing and provider details', async () => {
      const mockReport = {
        report_id: 1,
        reason: 'Fake / Scam',
        details: 'Company does not exist',
        status: 'pending',
        reported_by: 'user@test.com',
        created_at: new Date(),
        listing: {
          listname: 'Test Job',
          list_type: 'Internship',
          location: 'Cape Town',
          stipend: 5000,
          nqf_level: 4,
          description: 'Job description',
          provider: { provider_name: 'Test Company' }
        }
      };

      prisma.report.findUnique.mockResolvedValue(mockReport);

      const response = await request(app).get('/api/reports/1');

      expect(response.status).toBe(200);
      expect(response.body.report_id).toBe(1);
      expect(response.body.reason).toBe('Fake / Scam');
      expect(response.body.details).toBe('Company does not exist');
      expect(response.body.listing).toBeDefined();
      expect(response.body.listing.provider).toBeDefined();
    });

    test('should return 404 if report not found', async () => {
      prisma.report.findUnique.mockResolvedValue(null);

      const response = await request(app).get('/api/reports/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Report not found');
    });
  });

  describe('PATCH /api/reports/:id/status - Update report status', () => {
    
    test('should update report status to "resolved"', async () => {
      prisma.report.update.mockResolvedValue({
        report_id: 1,
        status: 'resolved'
      });

      const response = await request(app)
        .patch('/api/reports/1/status')
        .send({ status: 'resolved' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('resolved');
    });

    test('should update report status to "dismissed"', async () => {
      prisma.report.update.mockResolvedValue({
        report_id: 1,
        status: 'dismissed'
      });

      const response = await request(app)
        .patch('/api/reports/1/status')
        .send({ status: 'dismissed' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('dismissed');
    });
  });
});