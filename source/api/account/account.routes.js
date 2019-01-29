const express = require('express')
const validate = require('express-validation')
const { routesUtil } = require('../../util')
const AuthServices = require('../../services/auth').authorization
const UserController = require('../user/user.controller')
const AccountValidation = require('./account.validation')


const router = new express.Router()

/**
 * {GET} /account
 */
router.get(
  '/',
  AuthServices.authorize('account:view'),
  validate(AccountValidation.getAccount),
  routesUtil.controllerHandler(
    UserController.getUser,
    req => [req.user.id],
  ),
)

/**
 * {PATCH} /account
 */
router.patch(
  '/',
  AuthServices.authorize('account:update'),
  validate(AccountValidation.updateAccount),
  routesUtil.controllerHandler(
    UserController.updateUser,
    req => [req.user.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    }],
  ),
)

/**
 * {DELETE} /account
 */
router.delete(
  '/',
  AuthServices.authorize('account:delete'),
  validate(AccountValidation.deleteAccount),
  routesUtil.controllerHandler(
    UserController.deleteUser,
    req => [req.user.id],
  ),
)


module.exports = router
