const prisma = require('../DB_connect/prisma');

jest.mock('../DB_connect/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  provider: {
    create: jest.fn(),
  },
}));

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { registerUser, getUserRole } = require('../backend/routes/user');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('registerUser', () => {
  test('should create a new applicant and return 201', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      user_id: 1, name: 'Lethabo', surname: 'Sekgobela',
      email: 'test@test.com', role: 'Applicant', firebase_uid: 'uid123'
    });

    const req = {
      body: { name: 'Lethabo', surname: 'Sekgobela', email: 'test@test.com', role: 'Applicant', firebase_uid: 'uid123' }
    };
    const res = mockRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User created successfully' }));
  });

  test('should return 400 if user already exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ email: 'test@test.com' });

    const req = {
      body: { name: 'Lethabo', surname: 'Sekgobela', email: 'test@test.com', role: 'Applicant', firebase_uid: 'uid123' }
    };
    const res = mockRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists in the database.' });
  });

  test('should create provider profile when role is Provider', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      user_id: 2, name: 'Bob', surname: 'Lee',
      email: 'bob@test.com', role: 'Provider', firebase_uid: 'uid456'
    });
    prisma.provider.create.mockResolvedValue({});

    const req = {
      body: { name: 'Bob', surname: 'Lee', email: 'bob@test.com', role: 'Provider', firebase_uid: 'uid456' }
    };
    const res = mockRes();

    await registerUser(req, res);

    expect(prisma.provider.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('should NOT create provider profile for Applicant role', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      user_id: 3, name: 'Jane', surname: 'Doe',
      email: 'jane@test.com', role: 'Applicant', firebase_uid: 'uid789'
    });

    const req = {
      body: { name: 'Jane', surname: 'Doe', email: 'jane@test.com', role: 'Applicant', firebase_uid: 'uid789' }
    };
    const res = mockRes();

    await registerUser(req, res);

    expect(prisma.provider.create).not.toHaveBeenCalled();
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const req = {
      body: { name: 'Lethabo', surname: 'Sekgobela', email: 'test@test.com', role: 'Applicant', firebase_uid: 'uid123' }
    };
    const res = mockRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('getUserRole', () => {
  test('should return role when user exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ role: 'Admin' });

    const req = { query: { email: 'admin@test.com' } };
    const res = mockRes();

    await getUserRole(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ role: 'Admin' });
  });

  test('should return 404 when user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const req = { query: { email: 'nobody@test.com' } };
    const res = mockRes();

    await getUserRole(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const req = { query: { email: 'test@test.com' } };
    const res = mockRes();

    await getUserRole(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});