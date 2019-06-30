const mongoose = require('mongoose')
const logger = require('../services/logger')
const config = require('../config')


async function connect() {
  mongoose.set('debug', config.databases.mongo.debug)

  await mongoose.connect(config.databases.mongo.uri, {
    // Options to fix deprecated warnings
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  })

  logger.debug(`MongoDB connected to uri: ${config.databases.mongo.uri}`)
  logger.info('MongoDB has been successfully connected.')
}

async function disconnect() {
  await mongoose.disconnect()
  logger.info('MongoDB has been successfully disconnected.')
}


module.exports = { connect, disconnect }
