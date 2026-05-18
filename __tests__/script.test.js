/**
 * @jest-environment jsdom
 */

describe('frontend/script.js button behavior', () => {
  const setupDom = () => {
    document.body.innerHTML = `
      <button id="registerBtn"></button>
      <div id="registerMessage"></div>
      <button id="applyBtn"></button>
      <div id="applyMessage"></div>
      <button id="postBtn"></button>
      <div id="postMessage"></div>
      <button id="approveBtn"></button>
      <button id="rejectBtn"></button>
      <div id="adminMessage"></div>
      <div id="statusText"></div>
    `;
  };

  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = '';
  });

  const loadScript = () => {
    jest.isolateModules(() => {
      require('../frontend/script');
    });
  };

  test('register button click shows success message', () => {
    setupDom();
    loadScript();

    document.getElementById('registerBtn').click();

    expect(document.getElementById('registerMessage').textContent).toBe('Account created successfully!');
    expect(document.getElementById('registerMessage').className).toBe('success');
  });

  test('apply button click shows success message', () => {
    setupDom();
    loadScript();

    document.getElementById('applyBtn').click();

    expect(document.getElementById('applyMessage').textContent).toBe('Application submitted successfully!');
    expect(document.getElementById('applyMessage').className).toBe('success');
  });

  test('post button click shows pending approval message', () => {
    setupDom();
    loadScript();

    document.getElementById('postBtn').click();

    expect(document.getElementById('postMessage').textContent).toBe('Listing submitted successfully! Status: Pending approval.');
    expect(document.getElementById('postMessage').className).toBe('success');
  });

  test('approve button click updates approval status and message', () => {
    setupDom();
    loadScript();

    document.getElementById('approveBtn').click();

    expect(document.getElementById('statusText').textContent).toBe('Approved');
    expect(document.getElementById('statusText').className).toBe('success');
    expect(document.getElementById('adminMessage').textContent).toBe('Listing approved successfully!');
    expect(document.getElementById('adminMessage').className).toBe('success');
  });

  test('reject button click updates rejection status and message', () => {
    setupDom();
    loadScript();

    document.getElementById('rejectBtn').click();

    expect(document.getElementById('statusText').textContent).toBe('Rejected');
    expect(document.getElementById('statusText').className).toBe('error');
    expect(document.getElementById('adminMessage').textContent).toBe('Listing rejected.');
    expect(document.getElementById('adminMessage').className).toBe('error');
  });

  test('script loads safely when buttons are absent', () => {
    document.body.innerHTML = '<div></div>';
    expect(() => loadScript()).not.toThrow();
  });
});
