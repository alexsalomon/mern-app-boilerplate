'use strict'

// Load variables from .env
require('dotenv').config()

const env = process.env.NODE_ENV || 'production'

const prodSettings = {
  env,
  app: {
    port: parseInt(process.env.PORT) || 8080,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || 'restful-api-prod',
    debug: process.env.DB_DEBUG || 'false',
  },
  auth: {
    secret: process.env.JWT_SECRET || 'supersecret',
    saltRounds: parseInt(process.env.JWT_SALT_ROUNDS) || 10,
    jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN) || 3600,
    passwordMinLength: parseInt(process.env.PASSWORD_MIN_LENGTH) || 8,
  },
}

const devSettings = { ...prodSettings }
devSettings.db.name = process.env.DB_NAME || 'restful-api-dev'
devSettings.db.debug = process.env.DB_DEBUG || 'true'

const testSettings = { ...prodSettings }
testSettings.db.name = process.env.DB_NAME || 'restful-api-test'
testSettings.db.debug = process.env.DB_DEBUG || 'true'

let config = {}
switch (env) {
  case 'development':
    config = devSettings
    break
  case 'test':
    config = testSettings
    break
  case 'production':
  default:
    config = prodSettings
    break
}

module.exports = config
