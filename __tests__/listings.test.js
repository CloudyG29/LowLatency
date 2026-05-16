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
});

describe('POST /api/listings/post', () => {
  test('should create a listing and return 201', async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 1,
      email: 'provider@test.com',
      provider: { provider_id: 1 }
    });
    prisma.listing.create.mockResolvedValue({
      listings_id: 1, listname: 'Test', list_type: 'Internship', status: 'pending'
    });

    const res = await request(app).post('/api/listings/post').send({
      listname: 'Test', list_type: 'Internship', email: 'provider@test.com',
      stipend: '5000', location: 'JHB', duration: '6 months',
      requirements: 'Matric', nqf_level: '4', closing_date: '2026-10-30',
      description: 'Test description'
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Listing created successfully');
  });

  test('should return 404 if provider not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app).post('/api/listings/post').send({
      listname: 'Test', list_type: 'Internship', email: 'nobody@test.com'
    });

    expect(res.status).toBe(404);
  });
});

describe('GET /api/listings/all', () => {
  test('should return all listings', async () => {
    prisma.listing.findMany.mockResolvedValue([
      { listings_id: 1, listname: 'Test', status: 'approved' }
    ]);

    const res = await request(app).get('/api/listings/all');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('should return 500 on database error', async () => {
    prisma.listing.findMany.mockRejectedValue(new Error('DB Error'));

    const res = await request(app).get('/api/listings/all');

    expect(res.status).toBe(500);
  });
});

describe('GET /api/listings/pending', () => {
  test('should return only pending listings', async () => {
    prisma.listing.findMany.mockResolvedValue([
      { listings_id: 1, listname: 'Test', status: 'pending' }
    ]);

    const res = await request(app).get('/api/listings/pending');

    expect(res.status).toBe(200);
    expect(res.body[0].status).toBe('pending');
  });
});

describe('GET /api/listings/approved', () => {
  test('should return only approved listings', async () => {
    prisma.listing.findMany.mockResolvedValue([
      {
        id: 1,
        title: 'Test Job',
        status: 'approved',
        provider: {},
        applications: [],
        _count: {
          applications: 5
        }
      }
    ]);

    const res = await request(app).get('/api/listings/approved');
    expect(res.status).toBe(200);
    expect(res.body[0].applicantCount).toBe(5);
    expect(res.body[0].status).toBe('approved');
    expect(res.body[0].hasApplied).toBe(false);
  });
});

describe('PATCH /api/listings/:id/status', () => {
  test('should update listing status to approved', async () => {
    prisma.listing.update.mockResolvedValue({
      listings_id: 1, status: 'approved'
    });

    const res = await request(app)
      .patch('/api/listings/1/status')
      .send({ status: 'approved' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('approved');
  });

  test('should update listing status to rejected', async () => {
    prisma.listing.update.mockResolvedValue({
      listings_id: 1, status: 'rejected'
    });

    const res = await request(app)
      .patch('/api/listings/1/status')
      .send({ status: 'rejected' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('rejected');
  });
});

describe('DELETE /api/listings/:id', () => {
  test('should delete a listing and return 200', async () => {
    prisma.listing.delete.mockResolvedValue({});

    const res = await request(app).delete('/api/listings/1');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Listing deleted.');
  });

  test('should return 500 on database error', async () => {
    prisma.listing.delete.mockRejectedValue(new Error('DB Error'));

    const res = await request(app).delete('/api/listings/1');

    expect(res.status).toBe(500);
  });
});

describe('POST /api/listings/apply', () => {
  test('should submit application and return 201', async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    prisma.listing.findUnique.mockResolvedValue({ listings_id: 1, provider_id: 1 });
    prisma.application.findFirst.mockResolvedValue(null);
    prisma.application.create.mockResolvedValue({
      application_id: 1, status: 'pending'
    });

    const res = await request(app).post('/api/listings/apply').send({
      listing_id: 1, email: 'applicant@test.com'
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Application submitted!');
  });

  test('should return 400 if already applied', async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    prisma.listing.findUnique.mockResolvedValue({ listings_id: 1, provider_id: 1 });
    prisma.application.findFirst.mockResolvedValue({ application_id: 1 });

    const res = await request(app).post('/api/listings/apply').send({
      listing_id: 1, email: 'applicant@test.com'
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Already applied.');
  });

  test('should return 404 if user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app).post('/api/listings/apply').send({
      listing_id: 1, email: 'nobody@test.com'
    });

    expect(res.status).toBe(404);
  });
});

describe('GET /api/listings/my-applications', () => {
  test('should return applications for a user', async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    prisma.application.findMany.mockResolvedValue([
      { application_id: 1, status: 'pending', listing: { listname: 'Test' } }
    ]);

    const res = await request(app)
      .get('/api/listings/my-applications')
      .query({ email: 'applicant@test.com' });

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('should return 404 if user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .get('/api/listings/my-applications')
      .query({ email: 'nobody@test.com' });

    expect(res.status).toBe(404);
  });
}); 

test('should submit application with motivation, availability and cv_name', async () => {
  prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
  prisma.listing.findUnique.mockResolvedValue({ listings_id: 1, provider_id: 7 });
  prisma.application.findFirst.mockResolvedValue(null);
  prisma.application.create.mockResolvedValue({
    application_id: 1,
    user_id: 1,
    listing_id: 1,
    provider_id: 7,
    motivation: 'I am interested',
    availability: 'Immediately',
    cv_name: 'cv.pdf',
    status: 'pending'
  });

  const res = await request(app).post('/api/listings/apply').send({
    listing_id: 1,
    email: 'applicant@test.com',
    motivation: 'I am interested',
    availability: 'Immediately',
    cv_name: 'cv.pdf'
  });

  expect(res.status).toBe(201);
  expect(res.body.message).toBe('Application submitted!');

  expect(prisma.application.create).toHaveBeenCalledWith({
    data: {
      user_id: 1,
      listing_id: 1,
      provider_id: 7,
      motivation: 'I am interested',
      availability: 'Immediately',
      cvOriginalFilename: 'cv.pdf',
      status: 'pending'
    }
  });
});