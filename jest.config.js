module.exports = {
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/**/*.js"
  ],
  testEnvironment: 'jsdom',
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "^cheerio$": "<rootDir>/node_modules/cheerio/dist/commonjs/index.js"
  },
};