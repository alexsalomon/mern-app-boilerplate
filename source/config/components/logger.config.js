const path = require('path')

const config = {
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
        default: null,
        env: 'SENTRY_DNS',
        sensitive: true,

      },
      level: {
        format: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
        default: 'error',
        args: 'sentryLevel',
        env: 'SENTRY_LEVEL',
      },
    },
  },
}

module.exports = config
