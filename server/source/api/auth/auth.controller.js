const HttpStatus = require('http-status')
const { APIError } = require('../../services/errorHandler/errors')
const config = require('../../config')
const mailer = require('../../services/mailer')
const User = require('../user/user.model')

/**
 * Registers a user.
 * @param {string} userParams The user's information.
 * @returns {object} The response object containing the jwt token.
 */
async function signup(userParams) {
  const user = await User.create(userParams)
  const accessToken = await user.createToken()

  await mailer.send({
    template: 'welcome',
    locals: { user },
    message: {
      to: {
        address: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
    },
  })

  return {
    token: {
      tokenType: 'JWT',
      accessToken,
      expiresIn: config.auth.jwt.expiresIn,
    },
    user: user.toPublic(),
  }
}

/**
 * Logs a user in.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {object} The response object containing the jwt token.
 */
async function login(email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new APIError({
      status: HttpStatus.NOT_FOUND,
      message: 'User email does not match records.',
    })
  }

  const isValidPassword = await user.isValidPassword(password)
  if (!isValidPassword) {
    throw new APIError({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Incorrect email and password combination.',
    })
  }

  const accessToken = await user.createToken()
  return {
    token: {
      tokenType: 'JWT',
      accessToken,
      expiresIn: config.auth.jwt.expiresIn,
    },
    user: user.toPublic(),
  }
}

module.exports = { signup, login }
