/** @jest-environment jsdom */

const APPLICANT_MODULE = "../frontend/roles_js/applicant_view";
const PROVIDER_MODULE = "../frontend/roles_js/provider_view";
const ADMIN_MODULE = "../frontend/roles_js/admin_view";

function makeFirebaseMock(currentUser, signOutMock = jest.fn().mockResolvedValue()) {
  return {
    auth: () => ({
      onAuthStateChanged: (callback) => callback(currentUser),
      signOut: signOutMock
    })
  };
}

function makeFetchOk(role, extra = {}) {
  return jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      role,
      email: extra.email || "user@example.com",
      name: extra.name || "Test",
      surname: extra.surname || "User"
    })
  });
}

function makeFetchFail(body = { error: "Unauthorized" }) {
  return jest.fn().mockResolvedValue({
    ok: false,
    json: async () => body
  });
}

describe("role guardrails", () => {
  let assignMock;

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();

    document.body.innerHTML = `
      <div id="topName"></div>
      <div id="topRole"></div>
      <div id="displayFirstName"></div>
      <div id="displayLastName"></div>
      <div id="displayEmail"></div>
      <div id="displayRoleBottom"></div>
    `;

    global.fetch = jest.fn();
    global.console.error = jest.fn();

    assignMock = jest.fn();
    window.__redirectToLoginMock = assignMock;
  });

  afterEach(() => {
    delete window.__redirectToLoginMock;
    jest.clearAllMocks();
  });

  test("guardApplicantPage allows an Applicant and stores user data", async () => {
    const fakeUser = {
      getIdToken: jest.fn().mockResolvedValue("token-123")
    };

    global.firebase = makeFirebaseMock(fakeUser);
    global.fetch = makeFetchOk("Applicant", {
      email: "applicant@test.com",
      name: "Ava",
      surname: "Dube"
    });

    const { guardApplicantPage } = require(APPLICANT_MODULE);

    const result = await guardApplicantPage();
    const stored = JSON.parse(localStorage.getItem("userData"));

    expect(result).toBe(true);
    expect(assignMock).not.toHaveBeenCalled();
    expect(stored).toEqual({
      email: "applicant@test.com",
      firstName: "Ava",
      lastName: "Dube",
      role: "Applicant"
    });
  });

  test("guardApplicantPage denies access when no user is logged in", async () => {
    global.firebase = makeFirebaseMock(null);

    const { guardApplicantPage } = require(APPLICANT_MODULE);

    const result = await guardApplicantPage();

    expect(result).toBe(false);
    expect(assignMock).toHaveBeenCalledWith("/login");
  });

  test("guardProviderPage denies access to the wrong role", async () => {
    const fakeUser = {
      getIdToken: jest.fn().mockResolvedValue("token-456")
    };

    global.firebase = makeFirebaseMock(fakeUser);
    global.fetch = makeFetchOk("Applicant");

    const { guardProviderPage } = require(PROVIDER_MODULE);

    const result = await guardProviderPage();

    expect(result).toBe(false);
    expect(assignMock).toHaveBeenCalledWith("/login");
  });

  test("guardProviderPage signs out and redirects when /api/user/role fails", async () => {
    const fakeUser = {
      getIdToken: jest.fn().mockResolvedValue("token-789")
    };
    const signOutMock = jest.fn().mockResolvedValue();

    global.firebase = makeFirebaseMock(fakeUser, signOutMock);
    global.fetch = makeFetchFail({ error: "Invalid token" });

    const { guardProviderPage } = require(PROVIDER_MODULE);

    const result = await guardProviderPage();

    expect(result).toBe(false);
    expect(signOutMock).toHaveBeenCalled();
    expect(assignMock).toHaveBeenCalledWith("/login");
  });

  test("guardAdminPage allows an Admin", async () => {
    const fakeUser = {
      getIdToken: jest.fn().mockResolvedValue("token-admin")
    };

    global.firebase = makeFirebaseMock(fakeUser);
    global.fetch = makeFetchOk("Admin");

    const { guardAdminPage } = require(ADMIN_MODULE);

    const result = await guardAdminPage();

    expect(result).toBe(true);
    expect(assignMock).not.toHaveBeenCalled();
  });

  test("guardAdminPage redirects when Firebase token call throws", async () => {
    const fakeUser = {
      getIdToken: jest.fn().mockRejectedValue(new Error("token failed"))
    };

    global.firebase = makeFirebaseMock(fakeUser);

    const { guardAdminPage } = require(ADMIN_MODULE);

    const result = await guardAdminPage();

    expect(result).toBe(false);
    expect(assignMock).toHaveBeenCalledWith("/login");
    expect(console.error).toHaveBeenCalled();
  });
});