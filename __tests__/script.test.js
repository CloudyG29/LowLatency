/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load the script content
const scriptContent = fs.readFileSync(path.join(__dirname, '../frontend/script.js'), 'utf8');
eval(scriptContent); // Execute the script in the test environment

describe('Frontend Script', () => {
  beforeEach(() => {
    // Set up DOM elements
    document.body.innerHTML = `
      <button id="registerBtn"></button>
      <div id="registerMessage"></div>
      <button id="applyBtn"></button>
      <div id="applyMessage"></div>
      <button id="postBtn"></button>
      <div id="postMessage"></div>
      <button id="approveBtn"></button>
      <div id="adminMessage"></div>
      <div id="statusText"></div>
      <button id="rejectBtn"></button>
    `;
  });

  test('registerBtn click shows success message', () => {
    const registerBtn = document.getElementById('registerBtn');
    const registerMessage = document.getElementById('registerMessage');

    registerBtn.click();

    expect(registerMessage.textContent).toBe('Account created successfully!');
    expect(registerMessage.className).toBe('success');
  });

  test('applyBtn click shows success message', () => {
    const applyBtn = document.getElementById('applyBtn');
    const applyMessage = document.getElementById('applyMessage');

    applyBtn.click();

    expect(applyMessage.textContent).toBe('Application submitted successfully!');
    expect(applyMessage.className).toBe('success');
  });

  test('postBtn click shows success message', () => {
    const postBtn = document.getElementById('postBtn');
    const postMessage = document.getElementById('postMessage');

    postBtn.click();

    expect(postMessage.textContent).toBe('Listing submitted successfully! Status: Pending approval.');
    expect(postMessage.className).toBe('success');
  });

  test('approveBtn click updates status and message', () => {
    const approveBtn = document.getElementById('approveBtn');
    const adminMessage = document.getElementById('adminMessage');
    const statusText = document.getElementById('statusText');

    approveBtn.click();

    expect(statusText.textContent).toBe('Approved');
    expect(statusText.className).toBe('success');
    expect(adminMessage.textContent).toBe('Listing approved successfully!');
    expect(adminMessage.className).toBe('success');
  });

  test('rejectBtn click updates status and message', () => {
    const rejectBtn = document.getElementById('rejectBtn');
    const adminMessage = document.getElementById('adminMessage');
    const statusText = document.getElementById('statusText');

    rejectBtn.click();

    expect(statusText.textContent).toBe('Rejected');
    expect(statusText.className).toBe('error');
    expect(adminMessage.textContent).toBe('Listing rejected.');
    expect(adminMessage.className).toBe('error');
  });

  test('buttons without elements do not throw errors', () => {
    // Remove some elements
    document.body.innerHTML = '<button id="registerBtn"></button>';

    const registerBtn = document.getElementById('registerBtn');

    // Should not throw
    expect(() => registerBtn.click()).not.toThrow();
  });
});