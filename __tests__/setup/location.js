// Runs before JSDOM seals the environment
const mockLocationSet = jest.fn();
let mockLocationHref = '';

const mockLocation = {
  get href() { return mockLocationHref; },
  set href(val) {
    mockLocationHref = val;
    mockLocationSet(val);
  },
  assign: jest.fn(),
  replace: jest.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
  configurable: true,
});

global.__mockLocation = mockLocation;
global.__mockLocationHref = () => mockLocationHref;
global.__resetMockLocation = () => { mockLocationHref = ''; };