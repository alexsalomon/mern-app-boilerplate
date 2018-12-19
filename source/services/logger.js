const winston = require('winston')
const Sentry = require('winston-sentry-raven-transport')
const config = require('../config')

let loggerOptions = {}
switch (config.env) {
  case 'dev':
  case 'test':
    loggerOptions = {
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
          level: 'debug',
          handleExceptions: true,
          colorize: true,
          timestamp: true,
        }),
      ],
    }
    break
  case 'prod':
  default:
    loggerOptions = {
      transports: [
        new winston.transports.File({
          format: winston.format.json(),
          filename: `${config.logger.logsPath}error.log`,
          level: 'error',
          handleExceptions: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          colorize: false,
          timestamp: true,
        }),
        new winston.transports.File({
          format: winston.format.json(),
          level: 'info',
          filename: `${config.logger.logsPath}combined.log`,
          handleExceptions: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          colorize: false,
          timestamp: true,
        }),
        new Sentry({
          dsn: config.logger.sentry.dns,
          level: config.logger.sentry.level,
          install: true,
          config: {
            captureUnhandledRejections: true,
          },
        }),
      ],
    }
    break
}

module.exports = winston.createLogger(loggerOptions)
