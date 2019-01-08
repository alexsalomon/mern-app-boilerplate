const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('../../../config')
const User = require('../../../api/user/user.model')

/**
 * Authentication token verification middleware.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {function} next The next middleware to be executed.
 * @returns {function} The next middleware to be executed.
 */
module.exports = () => new JWTstrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
}, async (token, done) => {
  try {
    const user = await User.findOneById(token.id)
    return done(null, user)
  } catch (error) {
    return done(error)
  }
})
