const rushstackEslintConfig = require('@rushstack/eslint-config/profile/node');
const assert = require('node:assert');
const path = require('node:path');
const {isDeepStrictEqual} = require('node:util');

// Rushstack: "This is a workaround for https://github.com/eslint/eslint/issues/3458".
require('@rushstack/eslint-config/patch/modern-module-resolution');

// ESLint configuration is not user-friendly.
const overrides = rushstackEslintConfig.overrides.filter((override) =>
  isDeepStrictEqual(override.files, ['*.ts', '*.tsx']),
);
assert(
  overrides.length === 1,
  "The assumption for locating the .ts override in '@rushstack/eslint-config' is faulty.",
);

module.exports = {
  extends: [
    '@rushstack/eslint-config/profile/node',
    '@rushstack/eslint-config/mixins/tsdoc',
    'plugin:eslint-comments/recommended',
    'plugin:unicorn/recommended',
  ],
  overrides: [
    {
      files: ['types/*.d.ts'],
      rules: {
        // Type files should have the name of the packages that use them, which don't necessarily follow this rule (e.g. `JSONStream`).
        'unicorn/filename-case': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        '@rushstack/typedef-var': 'off',
        // Rationale: https://github.com/microsoft/rushstack/blob/63777148e110b2d9b690e60d74e58af03d0e7b7e/stack/eslint-config/index.js#L327-L332
        '@typescript-eslint/naming-convention': overrides[0].rules[
          '@typescript-eslint/naming-convention'
        ].map((value) =>
          typeof value === 'object' && value.selector === 'interface'
            ? {format: ['PascalCase'], selector: 'interface'}
            : value,
        ),
      },
    },
    {
      files: ['__mocks__/**/*.ts', 'scripts/jest/*.js', '.eslintrc.js'],
      rules: {
        // Mocks and some configuration files cannot be modules.
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-top-level-await': 'off',
      },
    },
  ],
  parserOptions: {
    project: path.join(__dirname, './tsconfig.json'),
  },
  rules: {
    'eslint-comments/no-unused-disable': 'error',
    '@rushstack/hoist-jest-mock': 'off',
    // Since this is covered by 'eslint-comments/no-unlimited-disable'.
    'unicorn/no-abusive-eslint-disable': 'off',
    // Prettier complains.
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/prevent-abbreviations': ['error', {replacements: {args: false}}],
  },
};
