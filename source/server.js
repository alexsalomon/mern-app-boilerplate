/* eslint-disable no-console */

'use strict'

const express = require('express')
const chalk = require('chalk')
const config = require('./config/settings')
const database = require('./config/database')
const middlewares = require('./config/middlewares')
const routes = require('./config/routes')

// Start express app
const app = express()

// Initiate the database
database.init()

// Wrap all the middlewares with the server
middlewares(app)

// Add the API routes stack to the server
app.use('/', routes)

// Start the server ; We need this first check to make sure we don't run a second instance
if (!module.parent) {
  app.listen(config.app.port, err => {
    if (err) {
      console.log(chalk.red('Error trying to run the server.'))
      throw err
    } else {
      console.log(chalk.green.bold(`Server is listening on ${config.app.port}...\n`))
    }
  })
}

module.exports = app
