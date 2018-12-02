'use strict'

const path = require('path')
const dotenv = require('dotenv')

// Load variables from .env
dotenv.config()

const defaultEnv = 'production'
const envSettings = {
  current: process.env.NODE_ENV || defaultEnv,
  prod: 'production',
  dev: 'development',
  test: 'test',
}

const settings = {
  env: {
    current: envSettings.current,
    prod: envSettings.prod,
    dev: envSettings.dev,
    test: envSettings.test,
    isProd: envSettings.current === envSettings.prod,
    isDev: envSettings.current === envSettings.dev,
    isTest: envSettings.current === envSettings.test,
  },
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
  logger: {
    logsPath: path.join(__dirname, '../../logs/'),
    sentry: {
      dns: process.env.SENTRY_DNS,
      level: process.env.SENTRY_LEVEL || 'error',
    },
  },
}

const devSettings = JSON.parse(JSON.stringify(settings))
devSettings.db.name = process.env.DB_NAME || 'restful-api-dev'
devSettings.db.debug = process.env.DB_DEBUG || 'true'
devSettings.logger.sentry = {}

const testSettings = JSON.parse(JSON.stringify(settings))
testSettings.db.name = process.env.DB_NAME || 'restful-api-test'
testSettings.db.debug = process.env.DB_DEBUG || 'true'
devSettings.logger.sentry = {}

let config = {}
switch (settings.env.current) {
  case settings.env.dev:
    config = devSettings
    break
  case settings.env.test:
    config = testSettings
    break
  case settings.env.prod:
  default:
    config = settings
    break
}

module.exports = config
