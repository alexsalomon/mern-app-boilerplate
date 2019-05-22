/* eslint-disable no-sync */

const fse = require('fs-extra')
const winston = require('winston')
const Sentry = require('winston-sentry-raven-transport')
const config = require('../../config')
const stacktrace = require('./stacktrace.formats')


/**
 * Initializes the logger service.
 * @returns {object} the logger object.
 */
function initialize() {
  createLogsDirectory()
  const loggerOptions = getLoggerOptions(config.env)
  return winston.createLogger(loggerOptions)
}

/**
 * Creates a logs directory if one does not exist yet.
 * @returns {void}
 */
function createLogsDirectory() {
  fse.ensureDirSync(config.logger.logsPath)
}

/**
 * Returns the logger options for the specified application environment.
 * @param {string} env The environment name.
 * @returns {object} The logger options for the given environment.
 */
function getLoggerOptions(env) {
  return {
    // Stop winston from exiting after logging an uncaughtException
    exitOnError: false,
    transports: getLoggerTransports(env),
  }
}

function getLoggerTransports(env) {
  let transports = []
  switch (env) {
    case 'development':
      transports = getLoggerTransportsDev()
      break
    case 'test':
      transports = getLoggerTransportsTest()
      break
    case 'staging':
      transports = getLoggerTransportsStag()
      break
    case 'production':
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

function getLoggerTransportsTest() {
  return [
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.splat(),
        stacktrace,
      ),
      level: 'debug',
      filename: `${config.logger.logsPath}test-combined.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
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
      filename: `${config.logger.logsPath}error.log`,
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
      filename: `${config.logger.logsPath}combined.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ]
}

function getLoggerTransportsProd() {
  return [...getLoggerTransportsStag(), new Sentry({
    dsn: config.logger.sentry.dns,
    level: config.logger.sentry.level,
  })]
}


module.exports = initialize()
