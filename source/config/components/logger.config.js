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
}

module.exports = config
