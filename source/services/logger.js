/* eslint-disable no-sync */

const fse = require('fs-extra')
const winston = require('winston')
const Sentry = require('winston-sentry-raven-transport')
const config = require('../config')

const errorLogFile = `${config.logger.logsPath}error.log`
const combinedLogFile = `${config.logger.logsPath}combined.log`

module.exports = (() => {
  createLogFiles()
  const loggerOptions = getLoggerOptions(config.env)
  return winston.createLogger(loggerOptions)
})()

function createLogFiles() {
  fse.ensureFileSync(errorLogFile)
  fse.ensureFileSync(combinedLogFile)
}

function getLoggerOptions(env) {
  const loggerOptions = {
    // Stop winston from exiting after logging an uncaughtException
    exitOnError: false,
  }
  loggerOptions.transports = getLoggerTransports(env)
  return loggerOptions
}

function getLoggerTransports(env) {
  let transports = []
  switch (env) {
    case 'dev':
    case 'test':
      transports = getLoggerTransportsDev()
      break
    case 'stag':
      transports = getLoggerTransportsStag()
      break
    case 'prod':
    default:
      transports = getLoggerTransportsProd()
      break
  }
  return transports
}

function getLoggerTransportsDev() {
  return [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ level: true }),
        winston.format.simple(),
      ),
      level: 'debug',
    }),
  ]
}

function getLoggerTransportsStag() {
  return [
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      filename: errorLogFile,
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      level: 'info',
      filename: combinedLogFile,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ]
}

function getLoggerTransportsProd() {
  return [...getLoggerTransportsStag, new Sentry({
    dsn: config.logger.sentry.dns,
    level: config.logger.sentry.level,
  })]
}
