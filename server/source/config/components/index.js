const commonConfig = require('./common.config')
const databasesConfig = require('./databases.config')
const loggerConfig = require('./logger.config')
const mailerConfig = require('./mailer.config')
const authConfig = require('./auth.config')
const APIConfig = require('./api.config')


module.exports = {
  ...commonConfig,
  ...databasesConfig,
  ...loggerConfig,
  ...mailerConfig,
  ...authConfig,
  ...APIConfig,
}
