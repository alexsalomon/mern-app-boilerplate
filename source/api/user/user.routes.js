const express = require('express')
const validate = require('express-validation')
const HttpStatus = require('http-status')
const { routesUtil } = require('../../util')
const AuthServices = require('../../services/auth').authorization
const UserController = require('./user.controller')
const UserValidation = require('./user.validation')


const router = new express.Router()

/**
 * {POST} /users
 */
router.post(
  '/',
  AuthServices.authorize('user:create'),
  validate(UserValidation.createUser),
  routesUtil.controllerHandler(
    UserController.createUser,
    req => [{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    }],
    HttpStatus.CREATED,
  ),
)

/**
 * {GET} /users
 */
router.get(
  '/',
  AuthServices.authorize('user:view:list'),
  validate(UserValidation.listUsers),
  routesUtil.controllerHandler(
    UserController.listUsers,
    req => [
      {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        role: req.query.role,
      },
      {
        page: req.query.page,
        perPage: req.query.perPage,
      },
      {
        fields: req.query.sortOn,
      },
    ],
  ),
)

/**
 * {GET} /users/:id
 */
router.get(
  '/:id',
  AuthServices.authorize('user:view:id'),
  validate(UserValidation.getUser),
  routesUtil.controllerHandler(
    UserController.getUser,
    req => [req.params.id],
  ),
)

/**
 * {PATCH} /users/:id
 */
router.patch(
  '/:id',
  AuthServices.authorize('user:update'),
  validate(UserValidation.updateUser),
  routesUtil.controllerHandler(
    UserController.updateUser,
    req => [req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    }],
  ),
)

/**
 * {DELETE} /users/:id
 */
router.delete(
  '/:id',
  AuthServices.authorize('user:delete'),
  validate(UserValidation.deleteUser),
  routesUtil.controllerHandler(
    UserController.deleteUser,
    req => [req.params.id],
  ),
)


module.exports = router
