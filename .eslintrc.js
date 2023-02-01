module.exports = {
  parser: '@typescript-eslint/parser',

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],

  plugins: ['jest', '@typescript-eslint'],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  env: {
    es6: true,
  },

  rules: {
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/consistent-test-it': 'error',
  },
};
