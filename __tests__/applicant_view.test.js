/**
 * @jest-environment jsdom
 */

// FIX: Polyfill TextEncoder and TextDecoder for JSDOM
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

const { JSDOM } = require('jsdom');
// ... rest of your test code

describe('frontend/roles_js/applicant_view.js exports', () => {
  let applicantView;

  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = `
      <div id="displayFirstName"></div>
      <div id="displayLastName"></div>
      <div id="displayEmail"></div>
      <div id="topName"></div>
      <div id="topRole"></div>
      <div id="displayBio"></div>
      <div id="currentCvDisplay"></div>
      <div id="applicationsList"></div>
      <div id="loader" class="hidden"></div>
    `;

    localStorage.clear();
    applicantView = require('../frontend/roles_js/applicant_view');
  });

  test('renderProfile populates profile fields and bio', () => {
    localStorage.setItem('userData', JSON.stringify({
      name: 'Jane',
      surname: 'Doe',
      email: 'jane@example.com',
      role: 'Applicant',
      applicant: { bio: 'Experienced developer' },
      cvName: 'resume.pdf'
    }));

    applicantView.renderProfile();

    expect(document.getElementById('displayFirstName').textContent).toBe('Jane');
    expect(document.getElementById('displayLastName').textContent).toBe('Doe');
    expect(document.getElementById('displayEmail').textContent).toBe('jane@example.com');
    expect(document.getElementById('topName').textContent).toBe('Jane Doe');
    expect(document.getElementById('topRole').textContent).toBe('Applicant');
    expect(document.getElementById('displayBio').textContent).toBe('Experienced developer');
    expect(document.getElementById('currentCvDisplay').textContent).toBe('Current file: resume.pdf');
  });

  test('openModal and closeModal toggle modal active class', () => {
    const modal = document.createElement('div');
    modal.id = 'educationInfoModal';
    document.body.appendChild(modal);

    applicantView.openModal('educationInfoModal');
    expect(modal.classList.contains('active')).toBe(true);

    applicantView.closeModal('educationInfoModal');
    expect(modal.classList.contains('active')).toBe(false);
  });

  test('renderApplications shows applications when fetch returns data', async () => {
    localStorage.setItem('userData', JSON.stringify({ email: 'jane@example.com' }));
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([
        {
          listing: { listname: 'Software Internship', list_type: 'Internship' },
          created_at: '2026-01-01T00:00:00.000Z',
          status: 'pending'
        }
      ]) })
    );

    await applicantView.renderApplications();

    const containerHtml = document.getElementById('applicationsList').innerHTML;
    expect(containerHtml).toContain('Software Internship');
    expect(containerHtml).toContain('pending');
    expect(global.fetch).toHaveBeenCalledWith('/api/listings/my-applications?email=jane@example.com');
  });

  test('getCompetition returns correct labels', () => {
    expect(applicantView.getCompetition(2)).toEqual({ label: '2 applicants', level: 'low', text: 'Low competition' });
    expect(applicantView.getCompetition(15)).toEqual({ label: '15 applicants', level: 'moderate', text: 'Moderate' });
    expect(applicantView.getCompetition(50)).toEqual({ label: '50 applicants', level: 'high', text: 'High competition' });
    expect(applicantView.getCompetition(100)).toEqual({ label: '100 applicants', level: 'very-high', text: 'Very high' });
  });

  test('renderProfile uses fallback values when profile fields missing', () => {
    localStorage.setItem('userData', JSON.stringify({}));
    applicantView.renderProfile();

    expect(document.getElementById('displayFirstName').textContent).toBe('Not set');
    expect(document.getElementById('displayLastName').textContent).toBe('Not set');
    expect(document.getElementById('displayEmail').textContent).toBe('Not set');
    expect(document.getElementById('topName').textContent).toBe('Not set');
    expect(document.getElementById('topRole').textContent).toBe('Applicant');
    expect(document.getElementById('displayBio').textContent).toBe('No professional summary added yet.');
  });

  test('fetchOpportunities shows empty state when no listings available', async () => {
    document.body.innerHTML += '<div id="opportunitiesList"></div>';
    window.showLoader = jest.fn();
    window.hideLoader = jest.fn();

    localStorage.setItem('userData', JSON.stringify({ email: 'jane@example.com' }));
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));

    await applicantView.fetchOpportunities();

    expect(document.getElementById('opportunitiesList').innerHTML).toContain('No available opportunities found');
    expect(window.showLoader).toHaveBeenCalled();
    expect(window.hideLoader).toHaveBeenCalled();
  });

  test('saveProfileChanges returns false on failed update', async () => {
    document.body.innerHTML += '<div id="loader"></div>';
    localStorage.setItem('firebase_uid', 'abc123');
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, json: () => Promise.resolve({ error: 'Bad request' }) }));

    const result = await applicantView.saveProfileChanges({ name: 'Jane' });

    expect(result).toBe(false);
    expect(global.fetch).toHaveBeenCalledWith('/api/profile/abc123', expect.objectContaining({ method: 'PUT' }));
  });

  test('saveProfileChanges returns true and stores updated profile on success', async () => {
    document.body.innerHTML += `
      <div id="loader"></div>
      <div id="displayFirstName"></div>
      <div id="displayLastName"></div>
      <div id="displayEmail"></div>
      <div id="topName"></div>
      <div id="topRole"></div>
      <div id="displayBio"></div>
      <div id="currentCvDisplay"></div>
    `;
    localStorage.setItem('firebase_uid', 'abc123');
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'Jane', surname: 'Doe', email: 'jane@example.com', role: 'Applicant', applicant: { bio: 'Bio' } }) }));

    const result = await applicantView.saveProfileChanges({ name: 'Jane' });

    expect(result).toBe(true);
    expect(JSON.parse(localStorage.getItem('userData')).name).toBe('Jane');
    expect(document.getElementById('displayFirstName').textContent).toBe('Jane');
  });
});
