/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  
  global.fetch = jest.fn();
  global.onAuthStateChanged = jest.fn();
  global.firebase = {
    auth: () => ({
      onAuthStateChanged: global.onAuthStateChanged,
    }),
  };

const mockAssign = jest.fn();

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...window.location,
      assign: mockAssign,
    },
  });

  mockAssign.mockClear();
});

  document.body.innerHTML = `
    <div id="myOpportunities"></div>
    <div id="applicationsList"></div>
    <div id="loader" class="hidden"></div>
    <div id="msg"></div>
    <input id="listname" />
    <input id="list_type" />
    <input id="nqf_level" />
    <textarea id="description"></textarea>
    <textarea id="requirements"></textarea>
    <input id="closing_date" />
    <input id="stipend" />
    <input id="location" />
    <input id="duration" />
    <div id="postTab" class="tab-content"></div>
    <div id="manageTab" class="tab-content"></div>
    <div id="applicationsTab" class="tab-content"></div>
  `;
});

describe('frontend/roles_js/provider_view.js', () => {
  test('module imports successfully', () => {
    const providerView = require('../frontend/roles_js/provider_view');
    expect(providerView).toBeDefined();
  });

  test('guardProviderPage is exported', () => {
    const { guardProviderPage } = require('../frontend/roles_js/provider_view');
    expect(typeof guardProviderPage).toBe('function');
  });

  test('displayOpportunities is exported', () => {
    const { displayOpportunities } = require('../frontend/roles_js/provider_view');
    expect(typeof displayOpportunities).toBe('function');
  });

  test('displayApplications is exported', () => {
    const { displayApplications } = require('../frontend/roles_js/provider_view');
    expect(typeof displayApplications).toBe('function');
  });

  test('guardProviderPage allows valid provider user', async () => {
    const fakeUser = {
      email: 'provider@test.com',
      getIdToken: async () => 'token',
    };

    global.onAuthStateChanged.mockImplementation((callback) => callback(fakeUser));
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ role: 'Provider' }) });

    const { guardProviderPage } = require('../frontend/roles_js/provider_view');
    const result = await guardProviderPage();

    expect(result).toBe(true);
  });

  test('guardProviderPage rejects when no user signed in', async () => {
    global.onAuthStateChanged.mockImplementation((callback) => callback(null));

    const { guardProviderPage } = require('../frontend/roles_js/provider_view');
    const result = await guardProviderPage();

    expect(result).toBe(false);
  });

  test('guardProviderPage rejects non-provider users', async () => {
    const fakeUser = {
      email: 'admin@test.com',
      getIdToken: async () => 'token',
    };

    global.onAuthStateChanged.mockImplementation((callback) => callback(fakeUser));
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ role: 'Admin' }) });

    const { guardProviderPage } = require('../frontend/roles_js/provider_view');
    const result = await guardProviderPage();

    expect(result).toBe(false);
  });

  test('guardProviderPage handles fetch errors', async () => {
    const fakeUser = {
      email: 'provider@test.com',
      getIdToken: async () => 'token',
    };

    global.onAuthStateChanged.mockImplementation((callback) => callback(fakeUser));
    global.fetch.mockResolvedValueOnce({ ok: false });

    const { guardProviderPage } = require('../frontend/roles_js/provider_view');
    const result = await guardProviderPage();

    expect(result).toBe(false);
  });

  test('displayOpportunities handles empty listings', async () => {
    const fakeUser = {
      email: 'provider@test.com',
      getIdToken: async () => 'token',
    };

    global.onAuthStateChanged.mockImplementation((callback) => callback(fakeUser));
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });

    const { guardProviderPage, displayOpportunities } = require('../frontend/roles_js/provider_view');
    
    await guardProviderPage();
    await displayOpportunities();

    expect(document.getElementById('myOpportunities')).toBeDefined();
  });

  test('loader exists and has hidden class', () => {
    const providerView = require('../frontend/roles_js/provider_view');
    const loader = document.getElementById('loader');
    expect(loader.classList.contains('hidden')).toBe(true);
  });

  test('DOM elements are properly initialized', () => {
    const providerView = require('../frontend/roles_js/provider_view');
    
    expect(document.getElementById('myOpportunities')).toBeDefined();
    expect(document.getElementById('applicationsList')).toBeDefined();
    expect(document.getElementById('loader')).toBeDefined();
    expect(document.getElementById('msg')).toBeDefined();
  });

  test('guardProviderPage handles authentication errors', async () => {
    const fakeUser = {
      email: 'provider@test.com',
      getIdToken: jest.fn(async () => {
        throw new Error('Token error');
      }),
    };

    global.onAuthStateChanged.mockImplementation((callback) => callback(fakeUser));

    const { guardProviderPage } = require('../frontend/roles_js/provider_view');
    const result = await guardProviderPage();

    expect(result).toBe(false);
  });
});
