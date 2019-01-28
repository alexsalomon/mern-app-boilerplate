const validator = require('express-validation')
const logger = require('../logger')
const errors = require('../../util/errors')

function handleError(err, req, res, next) {
  err = convertKnownErrors(err)
  handleOperationalError(err, req, res, next)
  handleProgrammerError(err)
}

function handleOperationalError(err, req, res, next) {
  if (err.isOperational) {
    logger.warn(err.message, err)
    res.status(err.status).json(err.getFormattedError())
  }
}

function handleProgrammerError(err) {
  if (!err.isOperational) {
    logger.error(err.message, err)
    // Programmer errors leave the application in an unknown state, let's kill it.
    process.exit(1) /* eslint-disable-line no-process-exit */
  }
}

/**
 * Convert third-party library errors into our own custom errors. This is needed so
 * that we can call custom methods from ExtendableError (such as getFormattedError).
 * @param {Object} err the error being handled.
 * @returns {Object} the converted error.
 */
function convertKnownErrors(err) {
  if (err instanceof validator.ValidationError) {
    err = new errors.ValidationError(err)
  }
  return err
}

module.exports = { handleError }
