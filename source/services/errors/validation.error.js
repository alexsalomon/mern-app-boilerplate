const HttpStatus = require('http-status')
const ExtendableError = require('./extendable.error')

/**
 * Class representing a Validation error.
 * @extends ExtendableError
 */
class ValidationError extends ExtendableError {
  /**
   * Creates a Validation error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status = HttpStatus.BAD_REQUEST,
    isPublic = true,
  }) {
    super({
      message, errors, status, isPublic, stack,
    })
  }
}

module.exports = ValidationError
