const logger = require('./logger')

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

class ErrorHandler {
  handleError(err, req, res, next) {
    handleOperationalError(err, req, res, next)
    handleProgrammerError(err)
  }
}

module.exports = new ErrorHandler()
