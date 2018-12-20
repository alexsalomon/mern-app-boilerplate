const { ValidationError } = require('express-validation')
const logger = require('./logger')
const CustomValidationError = require('./errors/validation.error')

function handleOperationalError(err, req, res, next) {
  if (err.isOperational) {
    logger.warn(err.message, err)
    res.status(err.status).json(err.getFormattedError())
  }
}

function handleProgrammerError(err) {
  if (!err.isOperational) {
    logger.error(err.message, err)
    // Programmer errors leave the application in an unknown state ; let's kill it
    process.exit(1) /* eslint-disable-line no-process-exit */
  }
}

function convertKnownErrors(err) {
  // Converting express-validator middleware error into our own ValidationError
  if (err instanceof ValidationError) {
    err = new CustomValidationError(err)
  }
  return err
}

class ErrorHandler {
  handleError(err, req, res, next) {
    err = convertKnownErrors(err)
    handleOperationalError(err, req, res, next)
    handleProgrammerError(err)
  }
}

module.exports = new ErrorHandler()
