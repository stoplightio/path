export default {
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
  testMatch: ['<rootDir>/src/**/__tests__/*.spec.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
};
