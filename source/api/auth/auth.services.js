const ApiError = require('http-errors')
const jwt = require('jsonwebtoken')
const config = require('../../config/settings')

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (typeof authHeader !== 'undefined') {
      const bearer = authHeader.split(' ')
      const token = bearer[1]
      const decoded = await jwt.verify(token, config.auth.secret)
      req.userId = decoded.id
    } else {
      throw new ApiError.Unauthorized('No authorization token provided.')
    }
    return next()
  } catch (error) {
    return next(new ApiError.Unauthorized(error.message))
  }
}

async function createToken(userId) {
  const token = await jwt.sign({ id: userId }, config.auth.secret, {
    expiresIn: config.auth.jwtExpiresIn,
  })
  return token
}

module.exports = { verifyToken, createToken }
