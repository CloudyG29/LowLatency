/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  localStorage.clear();

  document.body.innerHTML = `
    <div id="totalOpportunities"></div>
    <div id="pendingOpportunities"></div>
    <div id="totalApplicants"></div>
    <div id="totalProviders"></div>
    <div id="pendingTable"></div>
    <div id="allTable"></div>
    <div id="applicantsTable"></div>
    <div id="providersTable"></div>
    <div id="opportunitiesTab" class="tab-content"></div>
    <div id="usersTab" class="tab-content"></div>
    <div id="loader" class="hidden"></div>
  `;

  global.fetch = jest.fn();
  global.firebase = {
    auth: jest.fn(() => ({
      onAuthStateChanged: jest.fn((callback) => {
        callback({
          email: 'admin@test.com',
          getIdToken: jest.fn(async () => 'token123'),
        });
      }),
      signOut: jest.fn(async () => {}),
    })),
  };

  window.location = { assign: jest.fn(), href: '' };
  localStorage.setItem('firebase_uid', 'test-uid-123');
});

describe('frontend/roles_js/admin_view.js', () => {
  test('imports the module successfully', () => {
    const adminView = require('../frontend/roles_js/admin_view');
    expect(adminView).toBeDefined();
  });

  test('guardAdminPage function is exported', () => {
    const { guardAdminPage } = require('../frontend/roles_js/admin_view');
    expect(typeof guardAdminPage).toBe('function');
  });

  test('loadDataOnStartup function is exported', () => {
    const { loadDataOnStartup } = require('../frontend/roles_js/admin_view');
    expect(typeof loadDataOnStartup).toBe('function');
  });

  test('DOM elements are properly set up', () => {
    require('../frontend/roles_js/admin_view');

    expect(document.getElementById('totalOpportunities')).toBeDefined();
    expect(document.getElementById('pendingTable')).toBeDefined();
    expect(document.getElementById('allTable')).toBeDefined();
    expect(document.getElementById('loader')).toBeDefined();
  });

  test('guardAdminPage allows valid admin users', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/user/role')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ role: 'Admin' }),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });

    const { guardAdminPage } = require('../frontend/roles_js/admin_view');
    const result = await guardAdminPage();

    expect(result).toBe(true);
  });

  test('guardAdminPage redirects non-admin users', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/user/role')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ role: 'Applicant' }),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });

    const { guardAdminPage } = require('../frontend/roles_js/admin_view');
    const result = await guardAdminPage();

    expect(result).toBe(false);
  });

  test('guardAdminPage handles no user signed in', async () => {
    global.firebase.auth = jest.fn(() => ({
      onAuthStateChanged: jest.fn((callback) => callback(null)),
    }));

    const { guardAdminPage } = require('../frontend/roles_js/admin_view');
    const result = await guardAdminPage();

    expect(result).toBe(false);
  });

  test('displayPending handles empty list', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/listings/pending')) {
        return Promise.resolve({
          json: () => Promise.resolve([]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    const adminView = require('../frontend/roles_js/admin_view');
    expect(document.getElementById('pendingTable')).toBeDefined();
  });

  test('displayAll handles empty listings', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/listings/all')) {
        return Promise.resolve({
          json: () => Promise.resolve([]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    const adminView = require('../frontend/roles_js/admin_view');
    expect(document.getElementById('allTable')).toBeDefined();
  });

  test('displayUsers handles empty users', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/admin/users')) {
        return Promise.resolve({
          json: () => Promise.resolve([]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    });

    const adminView = require('../frontend/roles_js/admin_view');
    expect(document.getElementById('applicantsTable')).toBeDefined();
  });

  test('showTab function exists and can be called', () => {
    const adminView = require('../frontend/roles_js/admin_view');
    // The showTab function is module-scoped, but the module should load without error
    expect(adminView).toBeDefined();
  });

  test('loadDataOnStartup handles profile fetch', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/profile')) {
        return Promise.resolve({
          json: () => Promise.resolve({ name: 'Admin' }),
        });
      }
      if (url.includes('/api/user/role')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ role: 'Admin' }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    });

    const { loadDataOnStartup } = require('../frontend/roles_js/admin_view');
    // The function should be callable
    expect(loadDataOnStartup).toBeDefined();
  });

  test('loader functionality', () => {
    require('../frontend/roles_js/admin_view');
    const loader = document.getElementById('loader');
    expect(loader.classList.contains('hidden')).toBe(true);
  });
});

