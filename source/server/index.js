const express = require('express')
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

  // Start the server ; We need this first check to make sure we don't run a second instance
  if (!module.parent) {
    app.listen(config.app.port, () => {
      logger.info(`Server is listening on ${config.app.port}...`)
    })
  }
}

// Start server
const app = express()
run(app).catch(err => logger.error(err))

module.exports = app
