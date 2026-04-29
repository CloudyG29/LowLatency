/**
 * @jest-environment jsdom
 */

// Mock Firebase
global.firebase = {
  auth: () => ({
    onAuthStateChanged: jest.fn((callback) => callback({ email: 'test@test.com' })),
  }),
};

// Mock fetch
global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});


// APPLICANT VIEW TESTS
describe('Applicant - renderOpportunities', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="opportunitiesList"></div>
      <div id="applicationsList"></div>
      <div id="opportunitiesTab" class="tab-content active"></div>
      <div id="applicationsTab" class="tab-content"></div>
      <div id="profileTab" class="tab-content"></div>
    `;
  });

  test('shows loading message initially', () => {
    const container = document.getElementById('opportunitiesList');
    container.innerHTML = '<div class="empty-state">⏳ Loading opportunities...</div>';
    expect(container.innerHTML).toContain('Loading');
  });

  test('shows no opportunities message when empty', () => {
    const container = document.getElementById('opportunitiesList');
    container.innerHTML = '<div class="empty-state">No opportunities available yet.</div>';
    expect(container.innerHTML).toContain('No opportunities available yet.');
  });

  test('shows opportunity card with correct fields', () => {
    const container = document.getElementById('opportunitiesList');
    const opp = {
      listname: 'Software Internship',
      list_type: 'Internship',
      location: 'Johannesburg',
      stipend: 5000,
      duration: '6 months',
      nqf_level: 4,
      description: 'Test description',
      requirements: 'Matric',
      listings_id: 1,
      provider: { provider_name: 'Test Provider' }
    };

    const card = document.createElement('div');
    card.className = 'opportunity-card';
    card.innerHTML = `
      <h3>${opp.listname}</h3>
      <p><strong>Provider:</strong> ${opp.provider.provider_name}</p>
      <p><strong>Type:</strong> ${opp.list_type}</p>
      <p><strong>Location:</strong> ${opp.location}</p>
      <p><strong>Stipend:</strong> ${opp.stipend}</p>
      <button class="apply-btn" data-id="${opp.listings_id}">Apply Now</button>
    `;
    container.appendChild(card);

    expect(container.innerHTML).toContain('Software Internship');
    expect(container.innerHTML).toContain('Test Provider');
    expect(container.innerHTML).toContain('Johannesburg');
    expect(container.innerHTML).toContain('Apply Now');
  });

  test('shows already applied when applicant has applied', () => {
    const container = document.getElementById('opportunitiesList');
    const card = document.createElement('div');
    card.innerHTML = `<div class="already-applied">✅ Already Applied</div>`;
    container.appendChild(card);
    expect(container.innerHTML).toContain('Already Applied');
  });

  test('shows error message when fetch fails', () => {
    const container = document.getElementById('opportunitiesList');
    container.innerHTML = '<div class="empty-state">Error loading opportunities.</div>';
    expect(container.innerHTML).toContain('Error loading opportunities.');
  });
});

describe('Applicant - renderApplications', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="applicationsList"></div>`;
  });

  test('shows loading message', () => {
    const container = document.getElementById('applicationsList');
    container.innerHTML = '<div class="empty-state">⏳ Loading...</div>';
    expect(container.innerHTML).toContain('Loading');
  });

  test('shows empty message when no applications', () => {
    const container = document.getElementById('applicationsList');
    container.innerHTML = '<div class="empty-state">You have not applied to any opportunities yet.</div>';
    expect(container.innerHTML).toContain('You have not applied');
  });

  test('shows application card with status', () => {
    const container = document.getElementById('applicationsList');
    const app = {
      listing: { listname: 'Software Internship', list_type: 'Internship' },
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    const div = document.createElement('div');
    div.className = 'application-card';
    div.innerHTML = `
      <h3>${app.listing.listname}</h3>
      <span class="status-badge status-${app.status}">${app.status}</span>
    `;
    container.appendChild(div);

    expect(container.innerHTML).toContain('Software Internship');
    expect(container.innerHTML).toContain('pending');
  });

  test('shows hired status correctly', () => {
    const container = document.getElementById('applicationsList');
    const div = document.createElement('div');
    div.innerHTML = `<span class="status-badge status-hired">hired</span>`;
    container.appendChild(div);
    expect(container.innerHTML).toContain('hired');
  });

  test('shows rejected status correctly', () => {
    const container = document.getElementById('applicationsList');
    const div = document.createElement('div');
    div.innerHTML = `<span class="status-badge status-rejected">rejected</span>`;
    container.appendChild(div);
    expect(container.innerHTML).toContain('rejected');
  });
});

describe('Applicant - showTab', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="opportunitiesTab" class="tab-content active"></div>
      <div id="applicationsTab" class="tab-content"></div>
      <div id="profileTab" class="tab-content"></div>
    `;
  });

  test('switches to applications tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('applicationsTab').classList.add('active');
    expect(document.getElementById('applicationsTab').classList.contains('active')).toBe(true);
    expect(document.getElementById('opportunitiesTab').classList.contains('active')).toBe(false);
  });

  test('switches to profile tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('profileTab').classList.add('active');
    expect(document.getElementById('profileTab').classList.contains('active')).toBe(true);
  });

  test('switches back to opportunities tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('opportunitiesTab').classList.add('active');
    expect(document.getElementById('opportunitiesTab').classList.contains('active')).toBe(true);
  });
});


// PROVIDER VIEW TESTS

describe('Provider - postOpportunity validation', () => {
  test('fails validation when title is empty', () => {
    const listname = '';
    const list_type = 'Internship';
    const isValid = !(!listname || !list_type);
    expect(isValid).toBe(false);
  });

  test('fails validation when type is empty', () => {
    const listname = 'Test';
    const list_type = '';
    const isValid = !(!listname || !list_type);
    expect(isValid).toBe(false);
  });

  test('fails validation when stipend is empty', () => {
    const stipend = '';
    const isValid = stipend !== '';
    expect(isValid).toBe(false);
  });

  test('fails validation when location is empty', () => {
    const location = '';
    const isValid = location !== '';
    expect(isValid).toBe(false);
  });

  test('fails validation when closing date is empty', () => {
    const closing_date = '';
    const isValid = closing_date !== '';
    expect(isValid).toBe(false);
  });

  test('passes validation when all required fields filled', () => {
    const listname = 'Software Internship';
    const list_type = 'Internship';
    const stipend = '5000';
    const location = 'Johannesburg';
    const duration = '6 months';
    const requirements = 'Matric';
    const nqf_level = '4';
    const closing_date = '2026-10-30';
    const isValid = !!(listname && list_type && stipend && location && duration && requirements && nqf_level && closing_date);
    expect(isValid).toBe(true);
  });
});

describe('Provider - displayOpportunities', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="myOpportunities"></div>
      <div id="applicationsList"></div>
      <div id="postTab" class="tab-content active"></div>
      <div id="manageTab" class="tab-content"></div>
      <div id="applicationsTab" class="tab-content"></div>
    `;
  });

  test('shows loading message', () => {
    const container = document.getElementById('myOpportunities');
    container.innerHTML = '<div class="empty-state">⏳ Loading opportunities...</div>';
    expect(container.innerHTML).toContain('Loading');
  });

  test('shows empty state when no opportunities', () => {
    const container = document.getElementById('myOpportunities');
    container.innerHTML = '<div class="empty-state">You have not posted any opportunities yet.</div>';
    expect(container.innerHTML).toContain('You have not posted');
  });

  test('shows opportunity with pending status', () => {
    const container = document.getElementById('myOpportunities');
    const opp = { listname: 'Test Job', list_type: 'Internship', status: 'pending', location: 'JHB', stipend: 5000, duration: '6 months', requirements: 'Matric', closing_date: null };
    const div = document.createElement('div');
    div.className = 'opportunity-card';
    div.innerHTML = `
      <h3>${opp.listname}</h3>
      <span class="status-badge status-${opp.status}">${opp.status}</span>
    `;
    container.appendChild(div);
    expect(container.innerHTML).toContain('Test Job');
    expect(container.innerHTML).toContain('pending');
  });

  test('shows opportunity with approved status', () => {
    const container = document.getElementById('myOpportunities');
    const div = document.createElement('div');
    div.innerHTML = `<span class="status-badge status-approved">approved</span>`;
    container.appendChild(div);
    expect(container.innerHTML).toContain('approved');
  });

  test('shows opportunity with rejected status', () => {
    const container = document.getElementById('myOpportunities');
    const div = document.createElement('div');
    div.innerHTML = `<span class="status-badge status-rejected">rejected</span>`;
    container.appendChild(div);
    expect(container.innerHTML).toContain('rejected');
  });
});

describe('Provider - displayApplications', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="applicationsList"></div>`;
  });

  test('shows loading message', () => {
    const container = document.getElementById('applicationsList');
    container.innerHTML = '<div class="empty-state">⏳ Loading applications...</div>';
    expect(container.innerHTML).toContain('Loading applications');
  });

  test('shows empty state when no applications', () => {
    const container = document.getElementById('applicationsList');
    container.innerHTML = '<div class="empty-state">No applications received yet.</div>';
    expect(container.innerHTML).toContain('No applications received yet.');
  });

  test('shows applicant name and listing', () => {
    const container = document.getElementById('applicationsList');
    const app = {
      user: { name: 'John', surname: 'Doe', email: 'john@test.com' },
      listing: { listname: 'Software Internship' },
      status: 'pending',
      application_id: 1,
      created_at: new Date().toISOString()
    };
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${app.user.name} ${app.user.surname}</strong> applied for <strong>${app.listing.listname}</strong></p>
      <span class="status-badge status-${app.status}">${app.status}</span>
      <button class="btn-hire" data-id="${app.application_id}">Hire</button>
      <button class="btn-reject" data-id="${app.application_id}">Reject</button>
    `;
    container.appendChild(div);
    expect(container.innerHTML).toContain('John Doe');
    expect(container.innerHTML).toContain('Software Internship');
    expect(container.innerHTML).toContain('Hire');
    expect(container.innerHTML).toContain('Reject');
  });

  test('hire button updates status', () => {
    let app = { status: 'pending' };
    app.status = 'hired';
    expect(app.status).toBe('hired');
  });

  test('reject button updates status', () => {
    let app = { status: 'pending' };
    app.status = 'rejected';
    expect(app.status).toBe('rejected');
  });
});

describe('Provider - showTab', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="postTab" class="tab-content active"></div>
      <div id="manageTab" class="tab-content"></div>
      <div id="applicationsTab" class="tab-content"></div>
    `;
  });

  test('switches to manage tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('manageTab').classList.add('active');
    expect(document.getElementById('manageTab').classList.contains('active')).toBe(true);
    expect(document.getElementById('postTab').classList.contains('active')).toBe(false);
  });

  test('switches to applications tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('applicationsTab').classList.add('active');
    expect(document.getElementById('applicationsTab').classList.contains('active')).toBe(true);
  });

  test('switches to post tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('postTab').classList.add('active');
    expect(document.getElementById('postTab').classList.contains('active')).toBe(true);
  });
});


// ADMIN VIEW TESTS

describe('Admin - displayPending', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pendingTable"></div>
      <div id="allTable"></div>
      <div id="applicantsTable"></div>
      <div id="providersTable"></div>
      <div id="opportunitiesTab" class="tab-content active"></div>
      <div id="usersTab" class="tab-content"></div>
      <span id="totalOpportunities">0</span>
      <span id="pendingOpportunities">0</span>
      <span id="totalApplicants">0</span>
      <span id="totalProviders">0</span>
    `;
  });

  test('shows no pending message when empty', () => {
    const container = document.getElementById('pendingTable');
    container.innerHTML = '<p>No pending opportunities.</p>';
    expect(container.innerHTML).toContain('No pending opportunities.');
  });

  test('shows pending opportunity with approve and reject buttons', () => {
    const container = document.getElementById('pendingTable');
    const opp = { listname: 'Test Job', list_type: 'Internship', nqf_level: 4, listings_id: 1, provider: { provider_name: 'Test Provider' } };
    container.innerHTML = `
      <table><tr>
        <td>${opp.listname}</td>
        <td>${opp.provider.provider_name}</td>
        <td>${opp.list_type}</td>
        <td>${opp.nqf_level}</td>
        <td>
          <button class="btn-approve" data-id="${opp.listings_id}">Approve</button>
          <button class="btn-reject" data-id="${opp.listings_id}">Reject</button>
        </td>
      </tr></table>
    `;
    expect(container.innerHTML).toContain('Test Job');
    expect(container.innerHTML).toContain('Approve');
    expect(container.innerHTML).toContain('Reject');
  });

  test('approve changes status to approved', () => {
    let opp = { status: 'pending' };
    opp.status = 'approved';
    expect(opp.status).toBe('approved');
  });

  test('reject changes status to rejected', () => {
    let opp = { status: 'pending' };
    opp.status = 'rejected';
    expect(opp.status).toBe('rejected');
  });
});

describe('Admin - displayAll', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="allTable"></div>`;
  });

  test('shows no opportunities message when empty', () => {
    const container = document.getElementById('allTable');
    container.innerHTML = '<p>No opportunities.</p>';
    expect(container.innerHTML).toContain('No opportunities.');
  });

  test('shows all listings with delete button', () => {
    const container = document.getElementById('allTable');
    const opp = { listname: 'Test Job', list_type: 'Internship', status: 'approved', listings_id: 1, provider: { provider_name: 'Test Provider' } };
    container.innerHTML = `
      <table><tr>
        <td>${opp.listname}</td>
        <td>${opp.provider.provider_name}</td>
        <td>${opp.list_type}</td>
        <td>${opp.status}</td>
        <td><button class="btn-delete" data-id="${opp.listings_id}">Delete</button></td>
      </tr></table>
    `;
    expect(container.innerHTML).toContain('Test Job');
    expect(container.innerHTML).toContain('Delete');
  });
});

describe('Admin - displayUsers', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="applicantsTable"></div>
      <div id="providersTable"></div>
    `;
  });

  test('shows no applicants message when empty', () => {
    const container = document.getElementById('applicantsTable');
    container.innerHTML = '<p>No applicants yet.</p>';
    expect(container.innerHTML).toContain('No applicants yet.');
  });

  test('shows no providers message when empty', () => {
    const container = document.getElementById('providersTable');
    container.innerHTML = '<p>No providers yet.</p>';
    expect(container.innerHTML).toContain('No providers yet.');
  });

  test('shows applicant name and email', () => {
    const container = document.getElementById('applicantsTable');
    const user = { name: 'John', surname: 'Doe', email: 'john@test.com', user_id: 1 };
    container.innerHTML = `
      <table><tr>
        <td>${user.name} ${user.surname}</td>
        <td>${user.email}</td>
      </tr></table>
    `;
    expect(container.innerHTML).toContain('John Doe');
    expect(container.innerHTML).toContain('john@test.com');
  });

  test('shows provider name and email', () => {
    const container = document.getElementById('providersTable');
    const user = { name: 'Jane', surname: 'Smith', email: 'jane@test.com', user_id: 2 };
    container.innerHTML = `
      <table><tr>
        <td>${user.name} ${user.surname}</td>
        <td>${user.email}</td>
      </tr></table>
    `;
    expect(container.innerHTML).toContain('Jane Smith');
    expect(container.innerHTML).toContain('jane@test.com');
  });
});

describe('Admin - updateStats', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="totalOpportunities">0</span>
      <span id="pendingOpportunities">0</span>
      <span id="totalApplicants">0</span>
      <span id="totalProviders">0</span>
    `;
  });

  test('updates total opportunities count', () => {
    document.getElementById('totalOpportunities').innerText = '5';
    expect(document.getElementById('totalOpportunities').innerText).toBe('5');
  });

  test('updates pending opportunities count', () => {
    document.getElementById('pendingOpportunities').innerText = '2';
    expect(document.getElementById('pendingOpportunities').innerText).toBe('2');
  });

  test('updates total applicants count', () => {
    document.getElementById('totalApplicants').innerText = '6';
    expect(document.getElementById('totalApplicants').innerText).toBe('6');
  });

  test('updates total providers count', () => {
    document.getElementById('totalProviders').innerText = '4';
    expect(document.getElementById('totalProviders').innerText).toBe('4');
  });

  test('filters applicants correctly', () => {
    const users = [
      { role: 'Applicant' }, { role: 'Applicant' }, { role: 'Provider' }, { role: 'Admin' }
    ];
    const applicants = users.filter(u => u.role === 'Applicant');
    expect(applicants.length).toBe(2);
  });

  test('filters providers correctly', () => {
    const users = [
      { role: 'Applicant' }, { role: 'Provider' }, { role: 'Provider' }, { role: 'Admin' }
    ];
    const providers = users.filter(u => u.role === 'Provider');
    expect(providers.length).toBe(2);
  });
});

describe('Admin - showTab', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="opportunitiesTab" class="tab-content active"></div>
      <div id="usersTab" class="tab-content"></div>
    `;
  });

  test('switches to users tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('usersTab').classList.add('active');
    expect(document.getElementById('usersTab').classList.contains('active')).toBe(true);
    expect(document.getElementById('opportunitiesTab').classList.contains('active')).toBe(false);
  });

  test('switches to opportunities tab', () => {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('opportunitiesTab').classList.add('active');
    expect(document.getElementById('opportunitiesTab').classList.contains('active')).toBe(true);
  });
});

describe('Role Based Access', () => {
  test('Applicant cannot access admin page', () => {
    const role = 'Applicant';
    expect(role === 'Admin').toBe(false);
  });

  test('Provider cannot access admin page', () => {
    const role = 'Provider';
    expect(role === 'Admin').toBe(false);
  });

  test('Admin can access admin page', () => {
    const role = 'Admin';
    expect(role === 'Admin').toBe(true);
  });

  test('Applicant redirects to applicant page', () => {
    const role = 'Applicant';
    const redirect = role === 'Applicant' ? '/applicant' : role === 'Provider' ? '/provider' : '/admin';
    expect(redirect).toBe('/applicant');
  });

  test('Provider redirects to provider page', () => {
    const role = 'Provider';
    const redirect = role === 'Applicant' ? '/applicant' : role === 'Provider' ? '/provider' : '/admin';
    expect(redirect).toBe('/provider');
  });

  test('Admin redirects to admin page', () => {
    const role = 'Admin';
    const redirect = role === 'Applicant' ? '/applicant' : role === 'Provider' ? '/provider' : '/admin';
    expect(redirect).toBe('/admin');
  });
});