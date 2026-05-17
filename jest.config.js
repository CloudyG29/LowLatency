module.exports = {
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "backend/**/*.js",
    "frontend/**/*.js"
  ],
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "^undici$": "<rootDir>/jest.undici.mock.js",
    "^cheerio$": "<rootDir>/node_modules/cheerio/dist/commonjs/index.js"
  },
};