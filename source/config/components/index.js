const commonConfig = require('./common.config')
const databasesConfig = require('./databases.config')
const loggerConfig = require('./logger.config')
const authConfig = require('./auth.config')
const APIConfig = require('./api.config')


module.exports = {
  ...commonConfig,
  ...databasesConfig,
  ...loggerConfig,
  ...authConfig,
  ...APIConfig,
}
