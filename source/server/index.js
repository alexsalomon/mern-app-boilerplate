const express = require('express')
const errorHandler = require('../services/errorHandler')
const logger = require('../services/logger')
const config = require('../config')
const database = require('./database')
const middlewares = require('./middlewares')
const routes = require('./routes')

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
    app.listen(config.server.port, () => {
      logger.info(`Server is listening on ${config.server.port}...`)
    })
  }
}

// Start server
const app = express()
run(app).catch(err => errorHandler.handleError(err))

module.exports = app
