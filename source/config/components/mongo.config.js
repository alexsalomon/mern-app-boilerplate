const config = {
  mongo: {
    uri: {
      format: String,
      default: 'mongodb://localhost:27017/restful-api-dev',
      arg: 'mongoDbUri',
      env: 'MONGODB_URI',
    },
    debug: {
      format: Boolean,
      default: true,
      arg: 'dbDebug',
      env: 'DB_DEBUG',
    },
  },
}

module.exports = config
