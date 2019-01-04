const HttpStatus = require('http-status')
const APIError = require('../../services/errors/api.error')
const User = require('../user/user.model')
const UserController = require('../user/user.controller')
const services = require('../../services/auth')

/**
 * Register a user.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Object} The response object containing the jwt token.
 */
async function register(email, password) {
  const user = await UserController.createUser(email, password)
  const token = await services.createToken(user._id)
  return { token }
}

/**
 * Logs a user in.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Object} The response object containing the jwt token.
 */
async function login(email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new APIError({ status: HttpStatus.NOT_FOUND, message: 'User not found.' })
  }

  const isPasswordValid = await user.isPasswordValid(password)
  if (!isPasswordValid) {
    throw new APIError({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Invalid email and password combination.',
    })
  }

  const token = await services.createToken(user._id)
  return { token }
}

module.exports = { register, login }
