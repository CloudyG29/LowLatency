jest.mock('../DB_connect/prisma', () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const prisma = require('../DB_connect/prisma');
const { getUsers, getUserByEmail } = require('../backend/routes/get_user');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('getUsers', () => {
  test('should return all users', async () => {
    const users = [
      { user_id: 1, name: 'Lethabo', role: 'Admin' },
      { user_id: 2, name: 'John', role: 'Applicant' },
    ];
    prisma.user.findMany.mockResolvedValue(users);

    const req = {};
    const res = mockRes();

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  test('should return 500 on database error', async () => {
    prisma.user.findMany.mockRejectedValue(new Error('DB Error'));

    const req = {};
    const res = mockRes();

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('getUserByEmail', () => {
  test('should return user when email exists', async () => {
    const user = { user_id: 1, name: 'Lethabo', email: 'test@test.com' };
    prisma.user.findUnique.mockResolvedValue(user);

    const req = { query: { email: 'test@test.com' } };
    const res = mockRes();

    await getUserByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  test('should return 400 if email is missing', async () => {
    const req = { query: {} };
    const res = mockRes();

    await getUserByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email query parameter is required.' });
  });

  test('should return 404 if user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const req = { query: { email: 'nobody@test.com' } };
    const res = mockRes();

    await getUserByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const req = { query: { email: 'test@test.com' } };
    const res = mockRes();

    await getUserByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});