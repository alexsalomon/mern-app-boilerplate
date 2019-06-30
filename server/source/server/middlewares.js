const path = require('path')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('../services/logger')
const AuthServices = require('../services/auth')
const config = require('../config')


module.exports = app => {
  // Set static files to the 'docs' folder in order to render API documentation
  app.use(express.static(path.join(__dirname, '../../docs')))

  // Performance tweak: GZIP compression
  app.use(compression())

  // Improves security by setting many HTTP headers
  app.use(helmet())

  // Enable CORS - Cross Origin Resource Sharing
  app.use(cors())

  // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
  app.use(methodOverride())

  // Parse body params and attach them to req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Authentication middleware
  app.use(AuthServices.initialize())

  // Logging HTTP request/response messages
  if (config.env === 'development') {
    app.use(morgan('dev'))
  } else if (config.env === 'production' || config.env === 'staging') {
    // Log 4xx response codes as warnings
    app.use(morgan('combined', {
      skip(req, res) {
        return res.statusCode < 400 || res.statusCode >= 500
      },
      stream: {
        write: message => {
          logger.warn(message.trim())
        },
      },
    }))

    // Log 5xx response codes as errors
    app.use(morgan('combined', {
      skip(req, res) {
        return res.statusCode < 500
      },
      stream: {
        write: message => {
          logger.error(message.trim())
        },
      },
    }))
  }
}
