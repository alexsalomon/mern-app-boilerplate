const path = require('path')
const dotenv = require('dotenv')
const config = require('./config')

// Load variables from .env
dotenv.config()

const env = config.get('env')
config.loadFile(path.join(__dirname, `./${env}.json`))

formatFirebasePrivateKey()

// Throws an error if config does not conform to schema
config.validate({ allowed: 'strict' })

/**
 * Replace literal '\n' found in Firebase's private key with the newline character
 * @returns {json} The config object
 */
function formatFirebasePrivateKey() {
  const firebaseKey = config.get('db.firebase.privateKey')
  if (firebaseKey) {
    config.set('db.firebase.privateKey', firebaseKey.replace(/\\n/gu, '\n'))
  }
}

module.exports = config.getProperties()
