export default {
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
    ],
  },
  testMatch: ['<rootDir>/src/**/__tests__/*.spec.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
};
