const HttpStatus = require('http-status')
const ExtendableError = require('./extendable.error')

/**
 * Class representing an authorization error.
 * @extends ExtendableError
 */
class AuthorizationError extends ExtendableError {
  /**
   * Creates an authorization error.
   * @param {string} message - Error message.
   * @param {string} stack - Error stacktrace.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    stack,
    message = 'You do not have permission to access this resource.',
    status = HttpStatus.FORBIDDEN,
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

module.exports = AuthorizationError
