const logger = require('./services/logger')


/**
 * Catch unhandled promise rejections and forward them to uncaughtException (see below)
 */
process.on('unhandledRejection', reason => {
  logger.warn('Reached unhandledRejection.')
  throw reason
})

/**
 * Handle exceptions not caught by express -- avoid ever reaching this function
 */
process.on('uncaughtException', err => {
  logger.warn('Reached uncaughtException.')
  logger.error(err.message, err)
  process.exit(1) /* eslint-disable-line no-process-exit */
})


module.exports = require('./server')
