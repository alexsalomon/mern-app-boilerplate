'use strict'

module.exports = {
  extends: [
    '@strv/javascript/environments/nodejs/v10',
    '@strv/javascript/environments/nodejs/optional',
    '@strv/javascript/environments/mocha/recommended',
    '@strv/javascript/coding-styles/recommended',
  ],
  rules: {
    "no-inline-comments": 0,

    // No warnings for express error handler function
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
  overrides: [{
    files: [
      "**/*.js",
    ],
    parserOptions: {
      "sourceType": "module",
    },
  },
  {
    files: [
      "**/*.spec.js",
    ],
    rules: {
      'no-sync': 'off',
      'max-len': 'off',
      "no-undefined": 'off',
    },
  }],
}