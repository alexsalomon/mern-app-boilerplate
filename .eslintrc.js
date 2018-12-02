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

    // no warnings for MongoDB's _id variable
    "no-underscore-dangle": [2, { "allow": ['_id'] }],

    // No warnings for express error handler function
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
  overrides: [{
    files: [
      "**/*.spec.js",
    ],
    rules: {
      'no-sync': 'off',
    },
  }],
}