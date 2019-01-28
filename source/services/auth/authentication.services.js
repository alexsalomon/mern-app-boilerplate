const passport = require('passport')
const errors = require('../../util/errors')
const strategies = require('./strategies')

/**
 * Default authentication options.
 */
const defaultOptions = {
  session: false,
  failWithError: true,
}

/**
 * Initialization middleware used to initialize the authentication
 * service in express.
 * @returns {string} The initialization middleware.
 */
function initialize() {
  registerStrategies()
  return passport.initialize()
}

/**
 * Defines what strategies will be used to authenticate the users.
 * @param {string} strategy The authentication strategy.
 * @returns {undefined}
 */
function registerStrategies() {
  passport.use('jwt', strategies.JwtStrategy)
}

/**
 * Authentication middleware used to authenticate users.
 * @param {string} strategyName The authentication strategy name.
 * @param {string} optionsParam The authentication strategy options.
 * @returns {string} The authentication middleware.
 */
function authenticate(strategyName, optionsParam) {
  const options = { ...defaultOptions, ...optionsParam }
  return (req, res, next) => {
    passport.authenticate(strategyName, options, (err, user) => {
      if (err) {
        return next(err)
      }

      const message = 'Only authenticated users have access to this resource.'
      if (!user) {
        return next(new errors.AuthenticationError({ message }))
      }

      req.user = user
      return next()
    })(req, res, next)
  }
}


module.exports = { initialize, authenticate }
