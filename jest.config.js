module.exports = {
  name: "testing-server",
  displayName: "app",
  verbose: true,
  clearMocks: true,
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  projects: [
    {
      displayName: "controllers",
      testEnvironment: "node",
      clearMocks: true,
      verbose: true,
      preset: "ts-jest",
      transform: {
        "^.+\\.tsx?$": "ts-jest",
      },
      extensionsToTreatAsEsm: [".ts"],
      globals: {
        "ts-jest": {
          useESM: true,
        },
      },
      moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
      },
      testMatch: ["<rootDir>/server/auth/controllers/**/__tests__/*.test.ts"],
      testPathIgnorePatterns: ["<rootDir>/server/auth/middleware/"],
      setupFilesAfterEnv: [
        "<rootDir>/server/auth/setups-for-tests/crudTestEnv.ts",
      ],
    },
    {
      displayName: "middleware",
      testEnvironment: "node",
      clearMocks: true,
      verbose: true,
      transform: {
        "^.+\\.tsx?$": "ts-jest",
      },
      extensionsToTreatAsEsm: [".ts"],
      globals: {
        "ts-jest": {
          useESM: true,
        },
      },
      moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
      },
      testMatch: ["<rootDir>/server/auth/middleware/**/__tests__/*.test.ts"],
      testPathIgnorePatterns: [
        "<rootDir>/server/auth/__mocks__/",
        "<rootDir>/server/auth/__tests__/",
        "<rootDir>/node_modules/",
      ],
      setupFilesAfterEnv: [
        "<rootDir>/server/auth/setups-for-tests/middlewareEnv.ts",
      ],
    },
  ],
};
