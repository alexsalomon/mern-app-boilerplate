'use strict'

const mongoose = require('mongoose')
const config = require('./settings')

function init() {
  mongoose.set('debug', config.db.debug)

  // Fix deprecated warnings
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useNewUrlParser', true)

  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
  mongoose.connection.on('error', err => {
    if (err) {
      throw err
    }
  })
}

module.exports = { init }
