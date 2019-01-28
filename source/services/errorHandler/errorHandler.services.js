const validator = require('express-validation')
const logger = require('../logger')
const errors = require('../../util/errors')

/**
 * Substitutes express' default error handler middleware.
 * @param {object} err The error object.
 * @param {object} req Express' request object.
 * @param {object} res Express' response object.
 * @param {function} next Express' next middleware in the execution chain.
 * @returns {void}
 */
function handleError(err, req, res, next) {
  err = convertKnownErrors(err)
  handleOperationalError(err, req, res, next)
  handleProgrammerError(err)
}

/**
 * Handles recoverable errors.
 * @param {object} err The error object.
 * @param {object} req Express' request object.
 * @param {object} res Express' response object.
 * @param {function} next Express' next middleware in the execution chain.
 * @returns {void}
 */
function handleOperationalError(err, req, res, next) {
  if (err.isOperational) {
    logger.warn(err.message, err)
    res.status(err.status).json(err.getFormattedError())
  }
}

/**
 * Handles unexpected errors.
 * @param {object} err The error object.
 * @param {object} req Express' request object.
 * @param {object} res Express' response object.
 * @param {function} next Express' next middleware in the execution chain.
 * @returns {void}
 */
function handleProgrammerError(err) {
  if (!err.isOperational) {
    logger.error(err.message, err)
    // Programmer errors leave the application in an unknown state, so let's kill it.
    process.exit(1) /* eslint-disable-line no-process-exit */
  }
}

/**
 * Convert third-party library errors into our own custom errors. This is needed so
 * that we can call custom methods from ExtendableError (such as getFormattedError).
 * @param {object} err the error being handled.
 * @returns {object} the converted error.
 */
function convertKnownErrors(err) {
  if (err instanceof validator.ValidationError) {
    err = new errors.ValidationError(err)
  }
  return err
}


module.exports = { handleError }
