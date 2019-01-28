const authentication = require('./authentication.services')
const authorization = require('./authorization.services')
const roles = require('./roles')

module.exports = {
  initialize: authentication.initialize,
  authorization,
  roles: Object.keys(roles),
}
