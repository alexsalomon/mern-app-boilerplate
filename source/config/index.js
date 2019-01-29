const path = require('path')
const dotenv = require('dotenv')
const convict = require('convict')
const configurations = require('./components')

// Load variables from .env
dotenv.config()

// Merge all component configurations into one object and send it to convict
const config = convict(configurations)

// Load options from ${env}.json
const defaultEnv = config.default('env')
const env = config.get('env')
if (env !== defaultEnv) {
  config.loadFile(path.join(__dirname, `./${env}.json`))
}

// Throws an error if config does not conform to schema
config.validate({ allowed: 'strict' })

// Export config as a normal object (not convict)
module.exports = config.getProperties()
