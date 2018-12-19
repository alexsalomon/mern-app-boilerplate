const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('../services/logger')
const config = require('../config')

module.exports = app => {
  app.use(compression())
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())

  if (config.env === 'dev') {
    app.use(morgan('dev'))
  } else if (config.env === 'prod' || config.env === 'stag') {
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }))
  }
}
