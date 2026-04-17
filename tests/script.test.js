/** @jest-environment jsdom */
describe('frontend/script.js', () => {
  beforeEach(() => {
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

    jest.resetModules();
    require('../frontend/script');
  });

  test('register button shows a success message', () => {
    document.getElementById('registerBtn').click();
    expect(document.getElementById('registerMessage').textContent).toBe('Account created successfully!');
    expect(document.getElementById('registerMessage').className).toBe('success');
  });

  test('apply button shows a success message', () => {
    document.getElementById('applyBtn').click();
    expect(document.getElementById('applyMessage').textContent).toBe('Application submitted successfully!');
    expect(document.getElementById('applyMessage').className).toBe('success');
  });

  test('post button updates post message with pending status', () => {
    document.getElementById('postBtn').click();
    expect(document.getElementById('postMessage').textContent).toBe('Listing submitted successfully! Status: Pending approval.');
    expect(document.getElementById('postMessage').className).toBe('success');
  });

  test('approve button updates status text and admin message', () => {
    document.getElementById('approveBtn').click();
    expect(document.getElementById('statusText').textContent).toBe('Approved');
    expect(document.getElementById('statusText').className).toBe('success');
    expect(document.getElementById('adminMessage').textContent).toBe('Listing approved successfully!');
    expect(document.getElementById('adminMessage').className).toBe('success');
  });

  test('reject button updates status text and admin message with error style', () => {
    document.getElementById('rejectBtn').click();
    expect(document.getElementById('statusText').textContent).toBe('Rejected');
    expect(document.getElementById('statusText').className).toBe('error');
    expect(document.getElementById('adminMessage').textContent).toBe('Listing rejected.');
    expect(document.getElementById('adminMessage').className).toBe('error');
  });
});
