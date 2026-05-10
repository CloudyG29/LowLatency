module.exports = {
  testEnvironment: "node",
  moduleNameMapper: {
    "^@supabase/supabase-js$": "<rootDir>/__mocks__/@supabase/supabase-js.js",
  },
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/script.js",
    "frontend/roles_js/applicant_view.js",
  ],
  testEnvironment: "jsdom",
};
