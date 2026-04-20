module.exports = {
  // testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/script.js",
    "frontend/roles_js/applicant_view.js"
  ],
  testMatch: ["**/tests/**/*.test.js"],
  testEnvironment: "jsdom",
};
