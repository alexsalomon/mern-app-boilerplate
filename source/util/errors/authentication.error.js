const HttpStatus = require('http-status')
const ExtendableError = require('./extendable.error')

/**
 * Class representing an authentication error.
 * @extends ExtendableError
 */
class AuthenticationError extends ExtendableError {
  /**
   * Creates an authentication error.
   * @param {string} message - Error message.
   * @param {string} stack - Error stacktrace.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    stack,
    status = HttpStatus.UNAUTHORIZED,
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

module.exports = AuthenticationError
