'use strict'

const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./settings')

const isDev = config.env === 'development'
const isTest = config.env === 'test'

module.exports = app => {
  app.use(compression())
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())

  if (isDev && !isTest) {
    app.use(morgan('dev'))
  }
}
