const config = {
  databases: {
    mongo: {
      uri: {
        format: String,
        default: 'mongodb://localhost:27017/restful-api',
        arg: 'mongoDbUri',
        env: 'MONGODB_URI',
      },
      debug: {
        format: Boolean,
        default: false,
        arg: 'dbDebug',
        env: 'DB_DEBUG',
      },
    },
  },
}


module.exports = config
