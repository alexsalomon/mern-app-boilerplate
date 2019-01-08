const HttpStatus = require('http-status')
const APIError = require('../../services/errors/api.error')
const User = require('../user/user.model')
const AuthServices = require('../../services/auth')
const config = require('../../config')

/**
 * Registers a user.
 * @param {string} firstName The user's first name.
 * @param {string} lastName The user's last name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Object} The response object containing the jwt token.
 */
async function signup(firstName, lastName, email, password) {
  const user = await User.create({ firstName, lastName, email, password })
  const publicUser = user.toPublic()
  const accessToken = await AuthServices.createToken(user._id)
  return {
    token: {
      tokenType: 'JWT',
      accessToken,
      expiresIn: config.jwt.expiresIn,
    },
    user: publicUser,
  }
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
    throw new APIError({ status: HttpStatus.NOT_FOUND, message: 'User email does not match records.' })
  }

  const isValidPassword = await user.isValidPassword(password)
  if (!isValidPassword) {
    throw new APIError({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Incorrect email and password combination.',
    })
  }

  const publicUser = user.toPublic()
  const accessToken = await AuthServices.createToken(user._id)
  return {
    token: {
      tokenType: 'JWT',
      accessToken,
      expiresIn: config.jwt.expiresIn,
    },
    user: publicUser,
  }
}

module.exports = { signup, login }
