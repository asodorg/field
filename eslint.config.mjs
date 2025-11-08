import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import globals from 'globals';

import path from 'node:path';
import url from 'node:url';

const fileUrl = url.fileURLToPath(import.meta.url);
const dirName = path.dirname(fileUrl);

const compat = new FlatCompat({
  baseDirectory: dirName,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

export default [
  ...compat.extends('prettier', 'eslint:recommended'),
  {
    files: ['**/*.[cm]{js,ts}', '**/*.{js,ts,json,md,yml}', '**/!(*.*)'],
    ignores: [
      /* Dependencies */
      '**/node_modules',
      '**/.pnp',
      '**/.pnp.js',
      '**/.yarn',
      '**/yarn.lock',
      '**/package-lock.json',

      /* Debug */
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/.pnpm-debug.log*',

      /* Artifacts */
      '**/build',
      '**/dist',
      '**/coverage',
      '**/.cache',

      /* Linting */
      '**/.husky',
      '**/.eslintignore',
      '**/.prettierignore',

      /* CI/CD */
      '**/.github',

      /* Misc */
      '**/.DS_Store',
      '**/*.pem',

      /* Environment */
      '**/.env',
      '**/.env*.local',

      /* Code editors */
      '.vscode/*',
      '!.vscode/extensions.json',
      '**/.idea',
      '**/*.suo',
      '**/*.ntvs*',
      '**/*.njsproj',
      '**/*.sln',
      '**/*.sw?',
    ],
  },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      globals: { ...globals.node },
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: dirName,
      },
      ecmaVersion: 5,
      sourceType: 'module',
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];
