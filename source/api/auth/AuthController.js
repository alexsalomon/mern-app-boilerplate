'use strict'

const ApiError = require('http-errors')
const User = require('../user/User')
const services = require('./AuthServices')

/**
 * Register a user.
 * @param {string} email a string value that represents the user's email.
 * @param {string} password a string value that represents the user's password.
 * @returns {Object} The response object containing the jwt token.
 */
async function register(email, password) {
  const user = await User.create({ email, password })
  const token = await services.createToken(user._id)
  return { auth: true, token }
}

/**
 * Logs a user in.
 * @param {string} email a string value that represents the user's email.
 * @param {string} password a string value that represents the user's password.
 * @returns {Object} The response object containing the jwt token.
 */
async function login(email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new ApiError.NotFound('User not found.')
  } else if (!user.isPasswordValid(password)) {
    throw new ApiError.Unauthorized('Invalid email and password combination.')
  }

  const token = await services.createToken(user._id)
  return { auth: true, token }
}

/**
 * Logs a user out.
 * @returns {Object} The response object.
 */
function logout() {
  return { auth: false, token: null }
}

module.exports = { register, login, logout }
