module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/script.js"
  ],
  testMatch: ["**/tests/**/*.test.js"]
};
