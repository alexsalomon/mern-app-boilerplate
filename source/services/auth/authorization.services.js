const authorizer = require('express-authorize')
const errors = require('../../util/errors')
const authenticator = require('./authentication.services')
const roles = require('./roles')

/**
 * Default authorization options.
 */
authorizer.options = {
  withPermissions,
  onDenied: onPermissionRequestDenied,
}

function authorize(permission) {
  return [
    authenticator.authenticate('jwt'),
    authorizer.isPermitted(permission),
  ]
}

function withPermissions(req) {
  const role = req.user.role
  return roles[role].permissions
}

function onPermissionRequestDenied(req, res, next) {
  next(new errors.AuthorizationError({}))
}


module.exports = { authorize }
