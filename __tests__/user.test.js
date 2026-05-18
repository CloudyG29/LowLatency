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

// Add this to mock the $transaction function!
prisma.$transaction = jest.fn().mockImplementation(async (arg) => {
  // If your backend uses an array: prisma.$transaction([ query1, query2 ])
  if (Array.isArray(arg)) {
    return Promise.all(arg);
  }
  // If your backend uses a callback: prisma.$transaction(async (tx) => { ... })
  return arg(prisma);
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
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

  test('should return 400 when email query parameter is missing', async () => {
    const req = { query: {} };
    const res = mockRes();

    await getUserRole(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing email query parameter.' });
  });
});

describe('getProviderOnboarded', () => {
  test('should return onboarded status for valid provider', async () => {
    prisma.user.findUnique.mockResolvedValue({
      role: 'Provider',
      provider: {
        onboarded: true,
        provider_name: '  Test Provider  ',
        profile: 'Test profile'
      }
    });

    const req = { query: { email: 'provider@test.com' } };
    const res = mockRes();

    // Need to add this function to exports
    const { getProviderOnboarded } = require('../backend/routes/user');
    await getProviderOnboarded(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      onboarded: true,
      provider_name: 'Test Provider',
      profile: 'Test profile'
    });
  });

  test('should return 404 when provider not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const req = { query: { email: 'noprovider@test.com' } };
    const res = mockRes();

    const { getProviderOnboarded } = require('../backend/routes/user');
    await getProviderOnboarded(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Provider not found.' });
  });

  test('should return 404 when user is not a provider', async () => {
    prisma.user.findUnique.mockResolvedValue({
      role: 'Applicant',
      provider: null
    });

    const req = { query: { email: 'applicant@test.com' } };
    const res = mockRes();

    const { getProviderOnboarded } = require('../backend/routes/user');
    await getProviderOnboarded(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('should return 400 when email query parameter is missing', async () => {
    const req = { query: {} };
    const res = mockRes();

    const { getProviderOnboarded } = require('../backend/routes/user');
    await getProviderOnboarded(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing email query parameter.' });
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const req = { query: { email: 'test@test.com' } };
    const res = mockRes();

    const { getProviderOnboarded } = require('../backend/routes/user');
    await getProviderOnboarded(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test('should handle missing profile gracefully', async () => {
    prisma.user.findUnique.mockResolvedValue({
      role: 'Provider',
      provider: {
        onboarded: false,
        provider_name: 'Provider',
        profile: null
      }
    });

    const req = { query: { email: 'provider@test.com' } };
    const res = mockRes();

    const { getProviderOnboarded } = require('../backend/routes/user');
    await getProviderOnboarded(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      onboarded: false,
      provider_name: 'Provider',
      profile: ''
    });
  });
});

describe('completeProviderOnboarding', () => {
  test('should complete onboarding for valid provider', async () => {
    prisma.user.findUnique.mockResolvedValue({
      role: 'Provider',
      provider: {
        provider_id: 1,
        provider_name: 'Old Name',
        profile: 'Old Profile',
        onboarded: false
      }
    });

    prisma.provider.update = jest.fn().mockResolvedValue({
      provider_id: 1,
      provider_name: 'New Provider',
      profile: 'New Profile',
      onboarded: true
    });

    const req = {
      body: {
        email: 'provider@test.com',
        provider_name: 'New Provider',
        profile: 'New Profile'
      }
    };
    const res = mockRes();

    const { completeProviderOnboarding } = require('../backend/routes/user');
    await completeProviderOnboarding(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Onboarding completed successfully' });
  });

  test('should return 404 when provider not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const req = {
      body: {
        email: 'noprovider@test.com',
        provider_name: 'Name',
        profile: 'Profile'
      }
    };
    const res = mockRes();

    const { completeProviderOnboarding } = require('../backend/routes/user');
    await completeProviderOnboarding(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Provider not found' });
  });

  test('should return 404 when user is not a provider', async () => {
    prisma.user.findUnique.mockResolvedValue({
      role: 'Applicant',
      provider: null
    });

    const req = {
      body: {
        email: 'applicant@test.com',
        provider_name: 'Name',
        profile: 'Profile'
      }
    };
    const res = mockRes();

    const { completeProviderOnboarding } = require('../backend/routes/user');
    await completeProviderOnboarding(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('should return 500 on database error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

    const req = {
      body: {
        email: 'provider@test.com',
        provider_name: 'Name',
        profile: 'Profile'
      }
    };
    const res = mockRes();

    const { completeProviderOnboarding } = require('../backend/routes/user');
    await completeProviderOnboarding(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test('should use existing profile when not provided', async () => {
    prisma.user.findUnique.mockResolvedValue({
      role: 'Provider',
      provider: {
        provider_id: 1,
        provider_name: 'Old Name',
        profile: 'Existing Profile',
        onboarded: false
      }
    });

    prisma.provider.update = jest.fn().mockResolvedValue({});

    const req = {
      body: {
        email: 'provider@test.com',
        provider_name: 'New Provider'
        // profile not provided
      }
    };
    const res = mockRes();

    const { completeProviderOnboarding } = require('../backend/routes/user');
    await completeProviderOnboarding(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});