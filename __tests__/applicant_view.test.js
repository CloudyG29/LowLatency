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
});
