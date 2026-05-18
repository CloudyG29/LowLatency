/**
 * @jest-environment jsdom
 */

// Capture location.href writes before JSDOM seals the property
// by spying on the existing descriptor's setter
let mockLocationHref = '';
const locationDescriptor = Object.getOwnPropertyDescriptor(window, 'location')
  || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'location');

// Work around JSDOM sealing by shadowing on the instance only if configurable
// Otherwise intercept via a Proxy on globalThis
try {
  Object.defineProperty(window, 'location', {
    configurable: true,
    get: () => ({
      get href() { return mockLocationHref; },
      set href(val) { mockLocationHref = val; },
      assign: jest.fn(),
      replace: jest.fn(),
    }),
  });
} catch(e) {
  // fallback: patch href only via the existing writable check
}

const mockAlert = jest.fn();
global.alert = mockAlert;

const mockUserDelete = jest.fn(() => Promise.resolve());
const mockSignOut = jest.fn(() => Promise.resolve());

const mockFirebaseUser = {
  uid: 'mock-uid-123',
  email: 'test@example.com',
  displayName: 'Jane Doe',
  delete: mockUserDelete,
};

const mockAuthInstance = {
  currentUser: mockFirebaseUser,
  signOut: mockSignOut,
  signInWithPopup: jest.fn(() => Promise.resolve({ user: mockFirebaseUser })),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: mockFirebaseUser })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: mockFirebaseUser })),
};

global.firebase = {
  initializeApp: jest.fn(),
  auth: () => mockAuthInstance,
};
global.firebase.auth.GoogleAuthProvider = jest.fn();

const {
  registerUser,
  finalizeSession,
  cleanupFailedFirebaseUser,
  signUpWithGoogle,
  signUpWithEmail,
  loginAndRedirect,
  loginWithGoogle
} = require('../frontend/public/firebase');

describe('Authentication & Synchronization Flow', () => {
  let originalConsoleError;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    localStorage.clear();
    mockLocationHref = '';

    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  describe('registerUser()', () => {
    test('successfully hits the backend and returns JSON payload', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const result = await registerUser('Jane', 'Doe', 'jane@example.com', 'Applicant', 'uid123');

      expect(global.fetch).toHaveBeenCalledWith('/api/user/register', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane',
          surname: 'Doe',
          email: 'jane@example.com',
          role: 'Applicant',
          firebase_uid: 'uid123'
        })
      }));
      expect(result).toEqual({ success: true });
    });

    test('throws error with message when backend fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Database conflict' }),
      });

      await expect(
        registerUser('Jane', 'Doe', 'jane@example.com', 'Applicant', 'uid123')
      ).rejects.toThrow('Database conflict');
    });
  });

  describe('finalizeSession()', () => {
    test('triggers browser alert and moves window context to /login', async () => {
      await finalizeSession('Applicant');
      expect(mockAlert).toHaveBeenCalledWith('Applicant signup successful!');
      expect(mockLocationHref).toBe('/login');
    });
  });

  describe('cleanupFailedFirebaseUser()', () => {
    test('attempts to delete current user context and signs out completely', async () => {
      mockAuthInstance.currentUser = mockFirebaseUser;
      await cleanupFailedFirebaseUser();
      expect(mockUserDelete).toHaveBeenCalled();
      expect(mockSignOut).toHaveBeenCalled();
    });

    test('still issues signOut if user deletion operation breaks down', async () => {
      mockAuthInstance.currentUser = mockFirebaseUser;
      mockUserDelete.mockRejectedValueOnce(new Error('Deletion blocked'));

      await cleanupFailedFirebaseUser();
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  describe('signUpWithGoogle()', () => {
    test('signs in via popup, syncs user with backend, and changes route', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await signUpWithGoogle('Applicant');

      expect(mockAuthInstance.signInWithPopup).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('/api/user/register', expect.any(Object));
      expect(mockLocationHref).toBe('/login');
    });

    test('cleans up Firebase registration state on backend synchronization failure', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Sync broke' }),
      });

      await expect(signUpWithGoogle('Applicant')).rejects.toThrow('Sync broke');
      expect(mockUserDelete).toHaveBeenCalled();
    });
  });

  describe('signUpWithEmail()', () => {
    test('creates new credential pair, saves database record, and closes session creation', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await signUpWithEmail('test@example.com', 'password123', 'Jane', 'Doe', 'Applicant');

      expect(mockAuthInstance.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockLocationHref).toBe('/login');
    });
  });

  describe('loginAndRedirect()', () => {
    test('authenticates via email and forwards to /applicant for non-provider role metrics', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ role: 'Applicant' }),
      });

      await loginAndRedirect('test@example.com', 'password123');

      expect(localStorage.getItem('firebase_uid')).toBe('mock-uid-123');
      expect(mockLocationHref).toBe('/applicant');
    });

    test('routes directly to onboarding page if Provider profile has not fulfilled profile requirements', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ role: 'Provider' }),
      });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ onboarded: false }),
      });

      await loginAndRedirect('test@example.com', 'password123');
      expect(mockLocationHref).toBe('/provider-onboarding');
    });

    test('routes to /provider lander if Provider profile is fully onboarded', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ role: 'Provider' }),
      });
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ onboarded: true }),
      });

      await loginAndRedirect('test@example.com', 'password123');
      expect(mockLocationHref).toBe('/provider');
    });
  });

  describe('loginWithGoogle()', () => {
    test('stores uid token and forwards validated ecosystem accounts based on backend roles', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ role: 'Admin' }),
      });

      await loginWithGoogle();
      expect(localStorage.getItem('firebase_uid')).toBe('mock-uid-123');
      expect(mockLocationHref).toBe('/admin');
    });

    test('logs out and triggers browser alerts if identity mapping verification breaks down', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
      });

      await loginWithGoogle();
      expect(mockSignOut).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith('User not found in database. Please sign up first.');
    });
  });
});