'use strict'

const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('../util/logger')
const config = require('./settings')

module.exports = app => {
  app.use(compression())
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())

  if (config.env.isDev && !config.env.isTest) {
    app.use(morgan('dev'))
  } else if (config.env.isProd) {
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }))
  }
}
