const path = require('path')
const dotenv = require('dotenv')
const config = require('./config')

// Load variables from .env
dotenv.config()

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
