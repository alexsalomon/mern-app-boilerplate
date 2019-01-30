const HttpStatus = require('http-status')
const ExtendableError = require('./extendable.error')


/**
 * Class representing a validation error.
 * @extends ExtendableError
 */
class ValidationError extends ExtendableError {
  /**
   * Creates a Validation error.
   * @param {string} message - Error message.
   * @param {Object} errors - Additional information on individual errors.
   * @param {string} stack - Error stacktrace.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    errors,
    stack,
    message = 'Validation error.',
    status = HttpStatus.BAD_REQUEST,
    isPublic = true,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    })
  }
}


module.exports = ValidationError
