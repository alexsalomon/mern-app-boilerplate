const path = require('path')
const dotenv = require('dotenv')
const convict = require('convict')
const commonConfig = require('./components/common.config')
const serverConfig = require('./components/server.config')
const mongoConfig = require('./components/mongo.config')
const loggerConfig = require('./components/logger.config')
const jwtConfig = require('./components/jwt.auth.config')
const localAuthConfig = require('./components/local.auth.config')

// Load variables from .env
dotenv.config()

// Merge all component configurations into one object and send it to convict
const config = convict({
  ...commonConfig,
  ...serverConfig,
  ...mongoConfig,
  ...loggerConfig,
  ...jwtConfig,
  ...localAuthConfig,
})

// Load options from ${env}.json
const defaultEnv = config.default('env')
const env = config.get('env')
if (env !== defaultEnv) {
  config.loadFile(path.join(__dirname, `./${env}.json`))
}

// Throws an error if config does not conform to schema
config.validate({ allowed: 'strict' })

// Export config as a normal object
module.exports = config.getProperties()
