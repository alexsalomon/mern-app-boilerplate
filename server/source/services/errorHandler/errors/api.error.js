const HttpStatus = require('http-status')
const ExtendableError = require('./extendable.error')


/**
 * Class representing an API error: API Errors are recoverable, foreseeable
 * errors encountered in the API business logic.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {string} stack - The error stack trace.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to the user or not.
   */
  constructor({
    message,
    stack,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    isPublic = true,
  }) {
    super({
      message,
      status,
      isPublic,
      stack,
    })
  }
}


module.exports = APIError
