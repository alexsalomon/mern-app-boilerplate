const path = require('path')
const convict = require('convict')

const config = convict({
  env: {
    format: ['dev', 'test', 'prod', 'stag'],
    default: 'dev',
    arg: 'env',
    env: 'NODE_ENV',
  },
  app: {
    port: {
      format: 'port',
      default: 8080,
      arg: 'port',
      env: 'PORT',
    },
  },
  db: {
    mongo: {
      uri: {
        format: String,
        default: 'mongodb://localhost:27017/restful-api-dev',
        arg: 'mongoDbUri',
        env: 'MONGODB_URI',
      },
      debug: {
        format: Boolean,
        default: true,
        arg: 'dbDebug',
        env: 'DB_DEBUG',
      },
    },
    firebase: {
      url: {
        format: 'url',
        default: 'https://address-book-api.firebaseio.com',
        arg: 'firebaseUrl',
        env: 'FIREBASE_URL',
      },
      privateKey: {
        format: String,
        default: '',
        env: 'FIREBASE_PRIVATE_KEY',
        sensitive: true,
      },
      clientEmail: {
        format: String,
        default: '',
        env: 'FIREBASE_CLIENT_EMAIL',
        sensitive: true,
      },
    },
  },
  auth: {
    secret: {
      format: String,
      default: 'supersecret',
      env: 'JWT_SECRET',
      sensitive: true,
    },
    saltRounds: {
      format: 'nat',
      default: 10,
      env: 'JWT_SALT_ROUNDS',
    },
    jwtExpiresIn: {
      format: 'nat',
      default: 3600,
      args: 'jwtExpiresIn',
      env: 'JWT_EXPIRES_IN',
    },
    password: {
      minLength: {
        format: 'nat',
        default: 8,
        env: 'PASSWORD_MIN_LENGTH',
      },
      maxLength: {
        format: 'nat',
        default: 128,
        env: 'PASSWORD_MAX_LENGTH',
      },
    },
  },
  logger: {
    logsPath: {
      format: String,
      default: path.join(__dirname, '../../logs/'),
      args: 'logs',
      env: 'LOGS_PATH',
    },
    sentry: {
      dns: {
        format: String,
        default: '',
        env: 'SENTRY_DNS',
        sensitive: true,

      },
      level: {
        format: String,
        default: 'error',
        args: 'sentryLevel',
        env: 'SENTRY_LEVEL',
      },
    },
  },
})

module.exports = config
