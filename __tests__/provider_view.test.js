/**
 * @jest-environment jsdom
 */

let providerView;

function setupDom() {
  document.body.innerHTML = `
    <div id="loader" class="loader-overlay hidden"></div>
    <div id="myOpportunities"></div>
    <div id="applicationsList"></div>
    <input id="listname" value="" />
    <input id="list_type" value="" />
    <input id="nqf_level" value="" />
    <textarea id="description"></textarea>
    <input id="requirements" value="" />
    <input id="closing_date" value="" />
    <input id="stipend" value="" />
    <input id="location" value="" />
    <input id="duration" value="" />
    <input id="sector" value="" />
    <p id="msg"></p>
  `;

  if (window.location) {
    window.location.assign = jest.fn();
    try {
      window.location.href = '';
    } catch (error) {
      // Some jsdom environments make href read-only
    }
  }
}

function loadProviderViewModule(fetchImplementation) {
  jest.resetModules();

  global.fetch = jest.fn(fetchImplementation);
  global.firebase = {
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn((cb) => cb({ email: 'provider@test.com' })),
    }),
  };

  providerView = require('../frontend/roles_js/provider_view');
}

describe('Provider view client logic', () => {
  beforeEach(() => {
    setupDom();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displayOpportunities shows empty state when no items exist', async () => {
    loadProviderViewModule(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
    );

    await providerView.displayOpportunities();

    const container = document.getElementById('myOpportunities');
    expect(container.textContent).toContain('You have not posted any opportunities yet.');
    expect(document.getElementById('loader').classList.contains('hidden')).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('/api/listings/provider?email=provider@test.com');
  });

  test('displayOpportunities renders opportunity cards when listings are returned', async () => {
    loadProviderViewModule(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              listname: 'Test Opportunity',
              list_type: 'Internship',
              location: 'Cape Town',
              stipend: 'R3000',
              duration: '3 months',
              requirements: 'Matric',
              closing_date: '2026-08-01',
              status: 'pending',
            },
          ]),
      }),
    );

    await providerView.displayOpportunities();

    const container = document.getElementById('myOpportunities');
    expect(container.querySelectorAll('.opportunity-card').length).toBe(1);
    expect(container.innerHTML).toContain('Test Opportunity');
    expect(container.innerHTML).toContain('pending');
  });

  test('displayApplications shows no applications message when empty', async () => {
    loadProviderViewModule(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
    );

    await providerView.displayApplications();

    const container = document.getElementById('applicationsList');
    expect(container.textContent).toContain('No applications received yet.');
    expect(document.getElementById('loader').classList.contains('hidden')).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('/api/listings/provider-applications?email=provider@test.com');
  });

  test('displayApplications renders pending application buttons', async () => {
    loadProviderViewModule((url) => {
      if (url.includes('/provider-applications')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                application_id: 1,
                created_at: '2026-06-01T00:00:00Z',
                status: 'pending',
                user: { name: 'Jane', surname: 'Doe', email: 'jane@example.com' },
                listing: { listname: 'Test Opportunity' },
              },
            ]),
        });
      }

      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    await providerView.displayApplications();

    const container = document.getElementById('applicationsList');
    expect(container.textContent).toContain('Jane Doe applied for');
    expect(container.innerHTML).toContain('Hire');
    expect(container.innerHTML).toContain('Reject');
  });

  test('postOpportunity fails validation when a required field is missing', async () => {
    setupDom();
    loadProviderViewModule(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
    );

    document.getElementById('listname').value = 'Test Opportunity';
    document.getElementById('list_type').value = '';
    document.getElementById('stipend').value = 'R2000';
    document.getElementById('location').value = 'Pretoria';
    document.getElementById('duration').value = '3 months';
    document.getElementById('requirements').value = 'Matric';
    document.getElementById('nqf_level').value = '4';
    document.getElementById('closing_date').value = '2026-11-01';
    document.getElementById('sector').value = 'Information Technology';

    await providerView.postOpportunity();

    const msg = document.getElementById('msg');
    expect(msg.innerText).toContain('Please fill in all fields before posting a job');
    expect(msg.style.color).toBe('rgb(252, 129, 129)');
    expect(global.fetch).not.toHaveBeenCalledWith('/api/listings/post', expect.anything());
  });

  test('postOpportunity submits a listing when all required fields are present', async () => {
    loadProviderViewModule((url, options) => {
      if (url === '/api/listings/post') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ message: 'Listing created successfully' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    document.getElementById('listname').value = 'Test Opportunity';
    document.getElementById('list_type').value = 'Internship';
    document.getElementById('stipend').value = 'R2000';
    document.getElementById('location').value = 'Pretoria';
    document.getElementById('duration').value = '3 months';
    document.getElementById('requirements').value = 'Matric';
    document.getElementById('nqf_level').value = '4';
    document.getElementById('closing_date').value = '2026-11-01';
    document.getElementById('sector').value = 'Information Technology';
    document.getElementById('description').value = 'A great role';

    await providerView.postOpportunity();

    const msg = document.getElementById('msg');
    expect(msg.innerText).toContain('✅ Posted! Waiting for admin approval.');
    expect(msg.style.color).toBe('rgb(104, 211, 145)');
    expect(global.fetch).toHaveBeenCalledWith('/api/listings/post',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      }),
    );
  });
});
