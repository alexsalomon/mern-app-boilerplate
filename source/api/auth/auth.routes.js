const HttpStatus = require('http-status')
const express = require('express')
const validate = require('express-validation')
const { routesUtil } = require('../../util')
const AuthController = require('./auth.controller')
const AuthValidation = require('./auth.validation')


const router = new express.Router()

/**
 * {POST} /signup
 */
router.post(
  '/signup',
  validate(AuthValidation.signup),
  routesUtil.controllerHandler(
    AuthController.signup,
    req => [{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    }],
    HttpStatus.CREATED,
  ),
)

/**
 * {POST} /login
 */
router.post(
  '/login',
  validate(AuthValidation.login),
  routesUtil.controllerHandler(
    AuthController.login,
    req => [req.body.email, req.body.password],
  ),
)


module.exports = router
