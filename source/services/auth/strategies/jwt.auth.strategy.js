const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('../../../config')
const User = require('../../../api/user/user.model')

/**
 * JWT Passport strategy: Extracts the authentication token from the
 * authorization request header of either 'JWT' or 'Bearer' type and
 * passes along the authenticated user's information to passportjs.
 * @param {object} req Express' request object.
 * @param {object} res Express' response object.
 * @param {function} next Express' next middleware in the execution chain.
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
