const passport = require('passport')
const jwt = require('jsonwebtoken')
// const HttpStatus = require('http-status')
const { APIError } = require('../../util/errors')
const config = require('../../config')
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
  return passport.authenticate(strategyName, options)
}

// function authenticate(strategyName, optionsParam) {
//   const options = { ...defaultOptions, ...optionsParam }
//   return (req, res, next) => {
//     passport.authenticate(strategyName, options, (err, user, info) => {
//       if (err) {
//         return next(err)
//         // return next(new APIError({
//         //   status: HttpStatus.UNAUTHORIZED,
//         //   message: err.message,
//         // }))
//       }

//       if (!user) {
//         return next(new APIError({
//           status: HttpStatus.UNAUTHORIZED,
//           message: info.message || 'Only authenticated users have access to this resource.',
//         }))
//       }

//       return next()
//     })(req, res, next)
//   }
// }

/**
 * Creates an authentication token.
 * @param {string} userId The user's id
 * @returns {string} The authentication token
 */
async function createToken(userId) {
  if (!userId) {
    throw new APIError({ message: 'JWT createToken(): Invalid userId', isPublic: false })
  }

  const token = await jwt.sign(
    { userId },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn },
  )
  return token
}


module.exports = { initialize, registerStrategies, authenticate, createToken }
