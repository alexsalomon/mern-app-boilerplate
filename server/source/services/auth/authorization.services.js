const authorizer = require('express-authorize')
const errors = require('../../services/errorHandler/errors')
const authenticator = require('./authentication.services')
const roles = require('./roles')


/**
 * Default authorization options.
 */
authorizer.options = {
  withPermissions: getLoggedInUserPermissions,
  onDenied: onAuthorizationRequestDenied,
}

/**
 * Returns all the middlewares necessary to authenticate the user and check whether he
 * has the required permissions to access the resource.
 * @param {string} permission The required permission to access resource.
 * @returns {function[]} An array with middlewares needed for authorization.
 */
function authorize(permission) {
  return [
    authenticator.authenticate('jwt'),
    authorizer.isPermitted(permission),
  ]
}

/**
 * Returns all the permissions for the logged in user.
 * @param {object} req Express' request object used to get the logged in user information.
 * @returns {string[]} A list of permissions for the logged in user.
 */
function getLoggedInUserPermissions(req) {
  const role = req.user.role
  return roles[role].permissions
}

/**
 * Executed when the authorization request is denied for lack of permissions.
 * @param {object} req Express' request object.
 * @param {object} res Express' response object.
 * @param {function} next Express' next middleware in the execution chain.
 * @returns {void}
 */
function onAuthorizationRequestDenied(req, res, next) {
  next(new errors.AuthorizationError({}))
}


module.exports = { authorize }
