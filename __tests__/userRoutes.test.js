/**
 * @jest-environment node
 */

jest.mock('../DB_connect/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn()
  },
  provider: {
    create: jest.fn()
  }
}));

const prisma = require('../DB_connect/prisma');
const userRoutes = require('../backend/routes/user');

const createResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('backend/routes/user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registerUser creates a new applicant and returns 201', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const newUser = { user_id: 1, name: 'Alice', surname: 'Rivera', email: 'alice@example.com', role: 'Applicant', firebase_uid: 'uid-123' };
    prisma.user.create.mockResolvedValue(newUser);

    const req = {
      body: {
        name: 'Alice',
        surname: 'Rivera',
        email: 'alice@example.com',
        role: 'Applicant',
        firebase_uid: 'uid-123'
      }
    };
    const res = createResponse();

    await userRoutes.registerUser(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'alice@example.com' } });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Alice',
        surname: 'Rivera',
        email: 'alice@example.com',
        role: 'Applicant',
        firebase_uid: 'uid-123'
      }
    });
    expect(prisma.provider.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully', user: newUser });
  });

  test('registerUser returns 400 when email already exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ email: 'alice@example.com' });
    const req = { body: { name: 'Alice', surname: 'Rivera', email: 'alice@example.com', role: 'Applicant', firebase_uid: 'uid-123' } };
    const res = createResponse();

    await userRoutes.registerUser(req, res);

    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists in the database.' });
  });

  test('registerUser creates a provider record for Provider role', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const newUser = { user_id: 2, name: 'Bob', surname: 'Lee', email: 'bob@example.com', role: 'Provider', firebase_uid: 'uid-456' };
    prisma.user.create.mockResolvedValue(newUser);

    const req = {
      body: {
        name: 'Bob',
        surname: 'Lee',
        email: 'bob@example.com',
        role: 'Provider',
        firebase_uid: 'uid-456'
      }
    };
    const res = createResponse();

    await userRoutes.registerUser(req, res);

    expect(prisma.provider.create).toHaveBeenCalledWith({
      data: {
        user_id: newUser.user_id,
        provider_name: 'Bob Lee',
        profile: 'New Provider Account'
      }
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully', user: newUser });
  });

  test('getUserRole returns the role when the user exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ role: 'Admin' });
    const req = { query: { email: 'admin@example.com' } };
    const res = createResponse();

    await userRoutes.getUserRole(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'admin@example.com' }, select: { role: true } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ role: 'Admin' });
  });

  test('getUserRole returns 404 when user is not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const req = { query: { email: 'missing@example.com' } };
    const res = createResponse();

    await userRoutes.getUserRole(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  test('backend/index exports the Express app without listening in test mode', () => {
    const app = require('../backend/index');
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });
});
