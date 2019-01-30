const passport = require('passport')
const errors = require('../../services/errorHandler/errors')
const strategies = require('./strategies')


/**
 * Default authentication options.
 */
const defaultOptions = {
  session: false,
  failWithError: true,
}

/**
 * Authentication initialization middleware: used to initialize the
 * authentication service in express.
 * @returns {function} The initialization middleware.
 */
function initialize() {
  registerStrategies()
  return passport.initialize()
}

/**
 * Register authentication strategies to be used with passportjs.
 * @returns {void}
 */
function registerStrategies() {
  passport.use('jwt', strategies.JwtStrategy)
}

/**
 * Authentication middleware used to authenticate users.
 * @param {string} strategyName The authentication strategy name.
 * @param {string} optionsParam The authentication strategy options.
 * @returns {function} The authentication middleware.
 */
function authenticate(strategyName, optionsParam) {
  const options = { ...defaultOptions, ...optionsParam }
  return (req, res, next) => {
    passport.authenticate(strategyName, options, (err, user) => {
      // Handle passportjs error:
      if (err) {
        next(err)
        return
      }

      // Handle unsuccessful authentication attempt:
      // P.S.: You can add 'info' as a third parameters of this arrow function to get
      // more details from either passportjs or the strategy.
      if (!user) {
        const message = 'Only authenticated users have access to this resource.'
        next(new errors.AuthenticationError({ message }))
        return
      }

      // Log user in:
      req.logIn(user, options, logInErr => {
        if (logInErr) {
          next(logInErr)
          return
        }
        next()
      })
    })(req, res, next)
  }
}


module.exports = { initialize, authenticate }
