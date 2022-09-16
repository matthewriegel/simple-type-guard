module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    '.eslintrc.rules.js',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
  overrides: [
    {
      // Test rules
      files: ['**/*.test.ts', '**/__tests__/**/*'],
      extends: ['.eslintrc.rules.tests.js'],
    },
  ],
};
