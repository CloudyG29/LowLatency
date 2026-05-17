module.exports = {
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/**/*.js"
  ],
  testEnvironment: "jsdom",
};