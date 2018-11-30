'use strict'

module.exports = {
  extends: [
    '@strv/javascript/environments/nodejs/v10',
    '@strv/javascript/environments/nodejs/optional',
    '@strv/javascript/environments/mocha/recommended',
    '@strv/javascript/coding-styles/recommended',
  ],
  rules: {
    // No warnings for express error handler function
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
}