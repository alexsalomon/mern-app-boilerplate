const commonConfig = require('./common.config')
const serverConfig = require('./server.config')
const mongoConfig = require('./mongo.config')
const loggerConfig = require('./logger.config')
const jwtConfig = require('./jwt.auth.config')
const localAuthConfig = require('./local.auth.config')
const usersConfig = require('./users.config')

module.exports = {
  ...commonConfig,
  ...serverConfig,
  ...mongoConfig,
  ...loggerConfig,
  ...jwtConfig,
  ...localAuthConfig,
  ...usersConfig,
}
