module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["<rootDir>/"],
  modulePathIgnorePatterns: ["<rootDir>/.build/"],
  clearMocks: true,
  testPathIgnorePatterns: ["/node_modules/", "/__tests__/dataModels/"],
  coveragePathIgnorePatterns: ["/node_modules", "/.build/"],
  coverageReporters: ["json-summary", "lcovonly"],
  collectCoverageFrom: ["src/**/*.ts", "!/node_modules/"],
}
