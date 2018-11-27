'use strict'

// Load variables from .env
require('dotenv').config()

const env = process.env.NODE_ENV || 'production'

const common = {
  app: {
    port: parseInt(process.env.PORT) || 3000,
  },
}

const development = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || 'restful-api-db',
    debug: process.env.DB_DEBUG || 'true',
  },
}

const test = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || 'restful-api-test',
    debug: process.env.DB_DEBUG || 'true',
  },
}

const production = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || 'restful-api-prod',
    debug: process.env.DB_DEBUG || 'false',
  },
}

const config = {
  development,
  test,
  production,
}

// Merge common and env specific variables
const currentConfig = { ...common, ...config[env] }
currentConfig.env = env

module.exports = currentConfig
