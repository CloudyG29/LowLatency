module.exports = {
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/script.js",
    "frontend/roles_js/applicant_view.js"
  ],
  testEnvironment: "node", // default for backend tests
  transformIgnorePatterns: [
    "/node_modules/(?!(cheerio|htmlparser2|parse5|css-select|css-what|domhandler|domutils|entities|boolbase|nth-check)/)"
  ]
};