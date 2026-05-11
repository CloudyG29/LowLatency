module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/script.js",
    "frontend/roles_js/applicant_view.js"
  ],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};