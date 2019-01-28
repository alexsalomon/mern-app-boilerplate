const authentication = require('./authentication.services')
const authorization = require('./authorization.services')
const roles = require('./roles')


/**
 * When using role base access control, we should always define what permissions
 * are necessary to access a private resource. Therefore, avoid exposing the authenticate
 * middleware separately from authorize. Additionally, role permissions should not be exposed
 * to the outside world. Use it only inside the auth service.
 */
module.exports = {
  initialize: authentication.initialize,
  authorization,
  roles: Object.keys(roles),
}
