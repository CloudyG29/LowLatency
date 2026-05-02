/**
 * @jest-environment jsdom
 */

const mockAssign = jest.fn();
global.window = { location: { assign: mockAssign } };
global.location = global.window.location;

const APPLICANT_MODULE = "../frontend/roles_js/applicant_view";
const PROVIDER_MODULE = "../frontend/roles_js/provider_view";
const ADMIN_MODULE = "../frontend/roles_js/admin_view";

describe("role guardrails", () => {
  let consoleErrorSpy;

  const setupFirebase = (user, signOutMock = jest.fn().mockResolvedValue()) => {
    global.firebase = {
      auth: () => ({
        onAuthStateChanged: (cb) => {
          setTimeout(() => cb(user), 0);
          return () => {};
        },
        signOut: signOutMock
      })
    };
  };

  const setupFetchOk = (role) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ role, email: "test@test.com", name: "Test", surname: "User" })
    });
  };

  const setupFetchFail = () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
  };

  const setupFetchThrow = () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
  };

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    mockAssign.mockClear();
    global.fetch = jest.fn();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    delete global.firebase;
  });

  // APPLICANT TESTS
  test("guardApplicantPage allows an Applicant", async () => {
    const user = { email: "applicant@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchOk("Applicant");

    const { guardApplicantPage } = require(APPLICANT_MODULE);
    const result = await guardApplicantPage();
    expect(result).toBe(true);
  });

  test("guardApplicantPage denies access when no user", async () => {
    setupFirebase(null);
    const { guardApplicantPage } = require(APPLICANT_MODULE);
    const result = await guardApplicantPage();
    expect(result).toBe(false);
  });

  test("guardApplicantPage denies access to wrong role", async () => {
    const user = { email: "applicant@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchOk("Provider");
    const { guardApplicantPage } = require(APPLICANT_MODULE);
    const result = await guardApplicantPage();
    expect(result).toBe(false);
  });

  test("guardApplicantPage handles fetch error", async () => {
    const user = { email: "applicant@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchThrow();
    const { guardApplicantPage } = require(APPLICANT_MODULE);
    const result = await guardApplicantPage();
    expect(result).toBe(false);
  });

  test("guardApplicantPage signs out on fetch fail", async () => {
    const signOut = jest.fn().mockResolvedValue();
    const user = { email: "applicant@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user, signOut);
    setupFetchFail();
    const { guardApplicantPage } = require(APPLICANT_MODULE);
    const result = await guardApplicantPage();
    expect(result).toBe(false);
    expect(signOut).toHaveBeenCalled();
  });

  // PROVIDER TESTS
  test("guardProviderPage allows a Provider", async () => {
    const user = { email: "provider@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchOk("Provider");
    const { guardProviderPage } = require(PROVIDER_MODULE);
    const result = await guardProviderPage();
    expect(result).toBe(true);
  });

  test("guardProviderPage denies access when no user", async () => {
    setupFirebase(null);
    const { guardProviderPage } = require(PROVIDER_MODULE);
    const result = await guardProviderPage();
    expect(result).toBe(false);
  });

  test("guardProviderPage denies access to wrong role", async () => {
    const user = { email: "provider@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchOk("Applicant");
    const { guardProviderPage } = require(PROVIDER_MODULE);
    const result = await guardProviderPage();
    expect(result).toBe(false);
  });

  test("guardProviderPage signs out on fetch fail", async () => {
    const signOut = jest.fn().mockResolvedValue();
    const user = { email: "provider@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user, signOut);
    setupFetchFail();
    const { guardProviderPage } = require(PROVIDER_MODULE);
    const result = await guardProviderPage();
    expect(result).toBe(false);
    expect(signOut).toHaveBeenCalled();
  });

  test("guardProviderPage handles token error", async () => {
    const user = { email: "provider@test.com", getIdToken: jest.fn().mockRejectedValue(new Error("Token error")) };
    setupFirebase(user);
    const { guardProviderPage } = require(PROVIDER_MODULE);
    const result = await guardProviderPage();
    expect(result).toBe(false);
  });

  test("guardProviderPage handles fetch error", async () => {
    const user = { email: "provider@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchThrow();
    const { guardProviderPage } = require(PROVIDER_MODULE);
    const result = await guardProviderPage();
    expect(result).toBe(false);
  });

  // ADMIN TESTS
  test("guardAdminPage allows an Admin", async () => {
    const user = { email: "admin@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchOk("Admin");
    const { guardAdminPage } = require(ADMIN_MODULE);
    const result = await guardAdminPage();
    expect(result).toBe(true);
  });

  test("guardAdminPage denies access when no user", async () => {
    setupFirebase(null);
    const { guardAdminPage } = require(ADMIN_MODULE);
    const result = await guardAdminPage();
    expect(result).toBe(false);
  });

  test("guardAdminPage denies access to wrong role", async () => {
    const user = { email: "admin@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchOk("Applicant");
    const { guardAdminPage } = require(ADMIN_MODULE);
    const result = await guardAdminPage();
    expect(result).toBe(false);
  });

  test("guardAdminPage signs out on fetch fail", async () => {
    const signOut = jest.fn().mockResolvedValue();
    const user = { email: "admin@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user, signOut);
    setupFetchFail();
    const { guardAdminPage } = require(ADMIN_MODULE);
    const result = await guardAdminPage();
    expect(result).toBe(false);
    expect(signOut).toHaveBeenCalled();
  });

  test("guardAdminPage handles token error", async () => {
    const user = { email: "admin@test.com", getIdToken: jest.fn().mockRejectedValue(new Error("Token error")) };
    setupFirebase(user);
    const { guardAdminPage } = require(ADMIN_MODULE);
    const result = await guardAdminPage();
    expect(result).toBe(false);
  });

  test("guardAdminPage handles fetch error", async () => {
    const user = { email: "admin@test.com", getIdToken: jest.fn().mockResolvedValue("token") };
    setupFirebase(user);
    setupFetchThrow();
    const { guardAdminPage } = require(ADMIN_MODULE);
    const result = await guardAdminPage();
    expect(result).toBe(false);
  });  


});