jest.mock('../DB_connect/prisma', () => ({
  user: {
    findUnique: jest.fn(),
  },
  listing: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  application: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const prisma = require('../DB_connect/prisma');
const express = require('express');
const request = require('supertest');
const listingsRouter = require('../backend/routes/listings');

const app = express();
app.use(express.json());
app.use('/api/listings', listingsRouter);

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('GET /api/listings/provider', () => {
  test('should return provider listings', async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 1,
      email: 'provider@test.com',
      provider: { provider_id: 1 }
    });
    prisma.listing.findMany.mockResolvedValue([
      { listings_id: 1, listname: 'Test', status: 'pending' }
    ]);

    const res = await request(app)
      .get('/api/listings/provider')
      .query({ email: 'provider@test.com' });

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('should return 404 if provider not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .get('/api/listings/provider')
      .query({ email: 'nobody@test.com' });

    expect(res.status).toBe(404);
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const res = await request(app)
      .get('/api/listings/provider')
      .query({ email: 'provider@test.com' });

    expect(res.status).toBe(500);
  });
});

describe('GET /api/listings/provider-applications', () => {
  test('should return applications for provider', async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 1,
      provider: { provider_id: 1 }
    });
    prisma.application.findMany.mockResolvedValue([
      { application_id: 1, status: 'pending', user: { name: 'John', surname: 'Doe', email: 'john@test.com' }, listing: { listname: 'Test' } }
    ]);

    const res = await request(app)
      .get('/api/listings/provider-applications')
      .query({ email: 'provider@test.com' });

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('should return 404 if provider not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .get('/api/listings/provider-applications')
      .query({ email: 'nobody@test.com' });

    expect(res.status).toBe(404);
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const res = await request(app)
      .get('/api/listings/provider-applications')
      .query({ email: 'provider@test.com' });

    expect(res.status).toBe(500);
  });
});

describe('PUT /api/listings/applications/:id/status', () => {
  test('should update application status to hired', async () => {
    prisma.application.update.mockResolvedValue({
      application_id: 1, status: 'hired'
    });

    const res = await request(app)
      .put('/api/listings/applications/1/status')
      .send({ status: 'hired' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('hired');
  });

  test('should update application status to rejected', async () => {
    prisma.application.update.mockResolvedValue({
      application_id: 1, status: 'rejected'
    });

    const res = await request(app)
      .put('/api/listings/applications/1/status')
      .send({ status: 'rejected' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('rejected');
  });

  test('should return 500 on database error', async () => {
    prisma.application.update.mockRejectedValue(new Error('DB Error'));

    const res = await request(app)
      .put('/api/listings/applications/1/status')
      .send({ status: 'hired' });

    expect(res.status).toBe(500);
  });
});

describe('GET /api/listings/my-applications - extra', () => {
  test('should return empty array when no applications', async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    prisma.application.findMany.mockResolvedValue([]);

    const res = await request(app)
      .get('/api/listings/my-applications')
      .query({ email: 'applicant@test.com' });

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    prisma.application.findMany.mockRejectedValue(new Error('DB Error'));

    const res = await request(app)
      .get('/api/listings/my-applications')
      .query({ email: 'applicant@test.com' });

    expect(res.status).toBe(500);
  });
});

describe('POST /api/listings/apply - extra', () => {
  test('should return 404 if listing not found', async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    prisma.listing.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/listings/apply')
      .send({ listing_id: 999, email: 'applicant@test.com' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Listing not found.');
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const res = await request(app)
      .post('/api/listings/apply')
      .send({ listing_id: 1, email: 'applicant@test.com' });

    expect(res.status).toBe(500);
  });
});

describe('POST /api/listings/post - extra', () => {
  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const res = await request(app).post('/api/listings/post').send({
      listname: 'Test', list_type: 'Internship', email: 'provider@test.com'
    });

    expect(res.status).toBe(500);
  });

  test('should handle null optional fields', async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 1,
      email: 'provider@test.com',
      provider: { provider_id: 1 }
    });
    prisma.listing.create.mockResolvedValue({
      listings_id: 1, listname: 'Test', list_type: 'Internship', status: 'pending'
    });

    const res = await request(app).post('/api/listings/post').send({
      listname: 'Test', list_type: 'Internship', email: 'provider@test.com'
    });

    expect(res.status).toBe(201);
  });
});