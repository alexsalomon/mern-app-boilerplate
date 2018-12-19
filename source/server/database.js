const mongoose = require('mongoose')
const config = require('../config')

function init() {
  mongoose.set('debug', config.db.mongo.debug)

  // Fix deprecated warnings
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useNewUrlParser', true)

  mongoose.connect(config.db.mongo.uri)
  mongoose.connection.on('error', err => {
    if (err) {
      throw err
    }
  })
}

module.exports = { init }
