import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import html from 'eslint-plugin-html';
import markdown from 'eslint-plugin-markdown';
import js from '@eslint/js';
import typeScriptESLint from '@typescript-eslint/eslint-plugin';
import typeScriptESLintParser from '@typescript-eslint/parser';

const compat = new FlatCompat();

export default [
  {
    ignores: ['**/fixtures/**', '**/dist/**']
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends('plugin:node/recommended', 'plugin:@typescript-eslint/eslint-recommended'),
  {
    plugins: {
      typeScriptESLint,
      html,
      markdown
    },
    languageOptions: {
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      },
      parser: typeScriptESLintParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
      }
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'error',
      'node/no-deprecated-api': 'off',
      'node/no-unpublished-import': 'off',
      'node/no-unpublished-require': 'off',
      'node/no-unsupported-features/es-syntax': 'off',
      'no-process-exit': 'off',
      'node/no-missing-import': 'off'
    }
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    processor: 'markdown/markdown',
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-unused-labels': 'off',
      'no-console': 'off',
      'padded-blocks': 'off',
      'node/no-missing-import': 'off',
      'node/no-extraneous-require': 'off',
      'import/no-unresolved': 'off',
      'node/no-missing-require': 'off'
    }
  },
  {
    files: ['scripts/**'],
    env: {
      node: true,
      browser: false
    }
  }
];
