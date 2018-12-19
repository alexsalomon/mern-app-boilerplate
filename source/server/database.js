const mongoose = require('mongoose')
const logger = require('../services/logger')
const config = require('../config')

module.exports = async () => {
  mongoose.set('debug', config.db.mongo.debug)

  // Options to fix deprecated warnings
  await mongoose.connect(config.db.mongo.uri, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  })

  logger.debug(`MongoDB connected to uri: ${config.db.mongo.uri}`)
  logger.info('MongoDB has been successfully connected.')
}
