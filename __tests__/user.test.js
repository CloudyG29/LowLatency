/**
 * @jest-environment node
 */

const prisma = require('../DB_connect/prisma');

// 1. Setup complete mocks for all Prisma operations used across routes
jest.mock('../DB_connect/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  provider: {
    create: jest.fn(),
    update: jest.fn(),
  },
}));

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Import all controller functions from your router file
const { 
  registerUser, 
  getUserRole, 
  getProviderOnboarded, 
  completeProviderOnboarding 
} = require('../backend/routes/user'); // Verify this path matches your structure

// Express Response mocking engine
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mock Prisma's interactive transaction architecture safely
prisma.$transaction = jest.fn().mockImplementation(async (arg) => {
  if (Array.isArray(arg)) {
    return Promise.all(arg);
  }
  return arg(prisma);
});

describe('User Authentication & Onboarding Route Controllers', () => {
  let consoleErrorSpy, consoleLogSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    // Prevent dummy expected errors from messing up test stdout logs
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  // ==========================================
  // 1. POST /api/user/register
  // ==========================================
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

      expect(res.status).toHaveBeenCalledWith(201);
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

      expect(prisma.provider.create).toHaveBeenCalledWith({
        data: {
          user_id: 2,
          provider_name: 'Bob Lee',
          profile: 'New Provider Account',
          onboarded: false
        }
      });
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

    test('should return 500 on database error and return explicit message details', async () => {
      const mockError = new Error('Prisma Connection Failure');
      mockError.code = 'P2002';
      prisma.user.findUnique.mockRejectedValue(mockError);

      const req = {
        body: { name: 'Lethabo', email: 'test@test.com' }
      };
      const res = mockRes();

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: "Internal server error while saving to the database.",
        details: 'Prisma Connection Failure'
      }));
    });
  });

  // ==========================================
  // 2. POST /api/user/complete-onboarding
  // ==========================================
  describe('completeProviderOnboarding', () => {
    test('should return 404 if user profile is missing, role is incorrect, or provider record is missing', async () => {
      // Branch A: User completely missing
      prisma.user.findUnique.mockResolvedValueOnce(null);
      const req = { body: { email: 'fake@test.com', provider_name: 'Tech Inc' } };
      let res = mockRes();

      await completeProviderOnboarding(req, res);
      expect(res.status).toHaveBeenCalledWith(404);

      // Branch B: User exists but is an Applicant instead of a Provider
      prisma.user.findUnique.mockResolvedValueOnce({ role: 'Applicant', provider: null });
      res = mockRes();
      await completeProviderOnboarding(req, res);
      expect(res.status).toHaveBeenCalledWith(404);

      // Branch C: User is a Provider, but the linked provider table relation is missing
      prisma.user.findUnique.mockResolvedValueOnce({ role: 'Provider', provider: null });
      res = mockRes();
      await completeProviderOnboarding(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should complete onboarding and update provider profile info with explicit fields', async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: 'Provider',
        provider: { provider_id: 12, profile: 'Old profile data' }
      });
      prisma.provider.update.mockResolvedValue({});

      const req = { body: { email: 'pro@test.com', provider_name: 'Innovate HQ', profile: 'Updated Bio Description' } };
      const res = mockRes();

      await completeProviderOnboarding(req, res);

      expect(prisma.provider.update).toHaveBeenCalledWith({
        where: { provider_id: 12 },
        data: { provider_name: 'Innovate HQ', profile: 'Updated Bio Description', onboarded: true }
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should fall back to original profile description if no new profile bio text is supplied', async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: 'Provider',
        provider: { provider_id: 15, profile: 'Fallback Profile Retention' }
      });

      const req = { body: { email: 'pro@test.com', provider_name: 'Innovate HQ', profile: '' } };
      const res = mockRes();

      await completeProviderOnboarding(req, res);

      expect(prisma.provider.update).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ profile: 'Fallback Profile Retention' })
      }));
    });

    test('should return 500 if updating the profile encounters a database error', async () => {
      prisma.user.findUnique.mockRejectedValue(new Error('Write lock failure'));
      const req = { body: { email: 'pro@test.com' } };
      const res = mockRes();

      await completeProviderOnboarding(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ==========================================
  // 3. GET /api/user/role?email=...
  // ==========================================
  describe('getUserRole', () => {
    test('should return 400 if email query parameter is completely missing', async () => {
      const req = { query: {} };
      const res = mockRes();

      await getUserRole(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing email query parameter." });
    });

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

  // ==========================================
  // 4. GET /api/user/provider-onboarded?email=...
  // ==========================================
  describe('getProviderOnboarded', () => {
    test('should return 400 if email parameter is missing from request query scope', async () => {
      const req = { query: {} };
      const res = mockRes();

      await getProviderOnboarded(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should return 404 if profile is missing, not a provider role, or profile data object does not exist', async () => {
      // Branch A: Missing user context
      prisma.user.findUnique.mockResolvedValueOnce(null);
      const req = { query: { email: 'invalid@test.com' } };
      let res = mockRes();

      await getProviderOnboarded(req, res);
      expect(res.status).toHaveBeenCalledWith(404);

      // Branch B: Target user found but role matches an Applicant profile
      prisma.user.findUnique.mockResolvedValueOnce({ role: 'Applicant', provider: null });
      res = mockRes();
      await getProviderOnboarded(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should safely return 200 payload parameters alongside formatting for whitespace values', async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: 'Provider',
        provider: {
          onboarded: true,
          provider_name: '   Trimmed Corporate Spaces  ',
          profile: 'Active Company Account Description'
        }
      });

      const req = { query: { email: 'valid-pro@test.com' } };
      const res = mockRes();

      await getProviderOnboarded(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        onboarded: true,
        provider_name: 'Trimmed Corporate Spaces', // Verifies structural string trimming execution
        profile: 'Active Company Account Description'
      });
    });

    test('should return fallback strings if name or profile values are null/undefined', async () => {
      prisma.user.findUnique.mockResolvedValue({
        role: 'Provider',
        provider: {
          onboarded: false,
          provider_name: null,
          profile: null
        }
      });

      const req = { query: { email: 'blank-pro@test.com' } };
      const res = mockRes();

      await getProviderOnboarded(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        onboarded: false,
        provider_name: '',
        profile: ''
      });
    });

    test('should return 500 when checking provider details hits a system failure', async () => {
      prisma.user.findUnique.mockRejectedValue(new Error('Connection dropped'));
      const req = { query: { email: 'pro@test.com' } };
      const res = mockRes();

      await getProviderOnboarded(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});