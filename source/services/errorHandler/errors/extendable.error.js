const HttpStatus = require('http-status')
const { formatUtil } = require('../../../util')


/**
 * Class that allows important information to be added to an Error object.
 * Every custom error in this API should extend this class.
 * Extendable errors are operational (recoverable) and foreseeable errors.
 * @extends Error
 */
class ExtendableError extends Error {
  /**
   * Creates an Extendable error.
   * @param {string} message - Error message.
   * @param {string} errors - Additional information on individual errors.
   * @param {string} stack - The error stack trace.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errors = errors
    this.status = status
    this.isPublic = isPublic
    this.isOperational = true
    this.stack = stack || Error.captureStackTrace(this, this.constructor.name)
  }

  /**
   * Formats the error for public viewing by removing sensitive information.
   * Also, essencial for providing a standardized format for all child errors.
   * @returns {object} The formatted error.
   */
  format() {
    // Default error format
    let formattedError = {
      error: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error.',
      },
    }

    // Error format without app specific values that we don't want the public to see
    if (this.isPublic) {
      formattedError = {
        error: {
          status: this.status,
          message: this.message,
          errors: this.errors,
        },
      }
    }

    return formatUtil.removeInvalidKeys(formattedError)
  }
}


module.exports = ExtendableError
