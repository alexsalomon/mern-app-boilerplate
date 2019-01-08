const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const strategies = require('./strategies')

/**
 * Initialization middleware used to initialize the authentication
 * service in express.
 * @returns {string} The initialization middleware.
 */
function initialize() {
  return passport.initialize()
}

/**
 * Defines what strategies will be used to authenticate the users.
 * @param {string} strategy The authentication strategy.
 * @returns {undefined}
 */
function registerStrategy(strategy) {
  passport.use(strategy.toString, strategy)
}

/**
 * Authentication middleware used to authenticate users.
 * @param {string} strategyName The authentication strategy name.
 * @param {string} options The authentication strategy options.
 * @returns {string} The authentication middleware.
 */
function authenticate(strategyName, options) {
  return passport.authenticate(strategyName, options)
}

/**
 * Creates an authentication token.
 * @param {string} userId The user's id
 * @returns {string} The authentication token
 */
async function createToken(userId) {
  const token = await jwt.sign(
    { userId },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn },
  )
  return token
}

// Register all authentication strategies
registerStrategy(strategies.JwtStrategy)


module.exports = { registerStrategy, initialize, authenticate, createToken }
