const express = require('express')
const errorHandler = require('../services/errorHandler')
const logger = require('../services/logger')
const config = require('../config')
const database = require('./database')
const middlewares = require('./middlewares')
const routes = require('./routes')

// Catch unhandled promise rejections and forward them to uncaughtException (see below)
process.on('unhandledRejection', reason => {
  logger.warn('Reached unhandledRejection.')
  throw reason
})

// Handle exceptions not caught by express -- avoid ever reaching this function
process.on('uncaughtException', err => {
  logger.warn('Reached uncaughtException.')
  logger.error(err.message, err)
  process.exit(1) /* eslint-disable-line no-process-exit */
})

async function run(app) {
  // Initialize databases
  await database()

  // Use middlewares
  middlewares(app)

  // Add the API routes stack to the server
  app.use('/', routes)

  // Override express default error handler
  app.use((err, req, res, next) => errorHandler.handleError(err, req, res, next))

  // Start the server ; We need this first check to make sure we don't run a second instance
  if (!module.parent) {
    app.listen(config.app.port, () => {
      logger.info(`Server is listening on ${config.app.port}...`)
    })
  }
}

// Start server
const app = express()
run(app).catch(err => errorHandler.handleError(err))

module.exports = app
