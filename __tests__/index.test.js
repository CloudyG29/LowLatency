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

const request = require('supertest');

jest.mock('../backend/routes/user', () => {
  const express = require('express');
  return express.Router();
});
jest.mock('../backend/routes/get_user', () => {
  const express = require('express');
  return express.Router();
});
jest.mock('../backend/routes/listings', () => {
  const express = require('express');
  return express.Router();
});
jest.mock('../backend/routes/profile', () => {
  const express = require('express');
  return express.Router();
});
jest.mock('../backend/routes/qualifications', () => {
  const express = require('express');
  return express.Router();
});

const app = require('../backend/index');

describe('Backend index.js routes', () => {
  test('GET / returns HTML', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toMatch(/<!doctype html>|<html/i);
  });

  test('GET /login returns login page HTML and sets Cross-Origin-Opener-Policy header', async () => {
    const response = await request(app).get('/login');

    expect(response.status).toBe(200);
    expect(response.headers['cross-origin-opener-policy']).toBe('same-origin-allow-popups');
    expect(response.text).toMatch(/login/i);
  });

  // REMOVED THE DUPLICATE/ORPHANED CODE THAT WAS CAUSING THE ERROR

  test('GET /provider-onboarding returns provider onboarding page HTML', async () => {
    const response = await request(app).get('/provider-onboarding');

    expect(response.status).toBe(200);
    expect(response.text).toMatch(/provider/i);
  });

  test('Unknown route returns 404', async () => {
    const response = await request(app).get('/does-not-exist');

    expect(response.status).toBe(404);
  });
});