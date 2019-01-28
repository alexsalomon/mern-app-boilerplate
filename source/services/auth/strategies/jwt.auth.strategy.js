const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('../../../config')
const User = require('../../../api/user/user.model')

/**
 * JWT Passport strategy: Extracts the authentication token from the
 * authorization request header of either 'JWT' or 'Bearer' type and
 * passes along the authenticated user's information through the req
 * object to the next middleware if authentication was successful, or
 * throws a 401 - Unauthorized error otherwise.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {function} next The next middleware to be executed.
 */
module.exports = new JWTstrategy({
  jwtFromRequest: ExtractJWT.fromExtractors([
    ExtractJWT.fromAuthHeaderAsBearerToken(),
    ExtractJWT.fromAuthHeaderWithScheme('jwt'),
  ]),
  secretOrKey: config.jwt.secret,
}, async (token, done) => {
  try {
    const user = await User.findById(token.id)
    return done(null, user)
  } catch (error) {
    return done(error, false, { message: 'User email does not match records.' })
  }
})
