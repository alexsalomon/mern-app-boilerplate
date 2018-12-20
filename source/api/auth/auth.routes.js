const express = require('express')
const validate = require('express-validation')
const routesUtil = require('../../util/routes.util')
const AuthController = require('./auth.controller')
const AuthValidation = require('./auth.validation')

const router = new express.Router()

/**
 * @api {post} /register Register a User
 * @apiName PostRegister
 * @apiGroup Auth
 *
 * @apiParam {String} email The user's email.
 * @apiParam {String} password The user's password.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "example@email.com",
 *       "password": "userpassword123",
 *     }
 *
 * @apiSuccess {String} token the jwt token necessary for authentication
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0",
 *     }
 *
 * @apiError BadRequest Either a required field was not provided or the email is not unique
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "BadRequest",
 *       "error": "Error message"
 *     }
 */
router.post(
  '/register',
  validate(AuthValidation.register),
  routesUtil.controllerHandler(
    AuthController.register,
    req => [req.body.email, req.body.password],
  ),
)

/**
 * @api {post} /login Log a User In
 * @apiName PostLogin
 * @apiGroup Auth
 *
 * @apiParam {String} email The user's email.
 * @apiParam {String} password The user's password.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "example@email.com",
 *       "password": "userpassword123",
 *     }
 *
 * @apiSuccess {String} token The jwt token necessary for authentication
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0",
 *     }
 *
 * @apiError NotFound The <code>email</code> of the User was not found.
 * @apiError BadRequest Either a required field was not provided or <code>email<code> is not unique
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "BadRequest",
 *       "error": "Error message"
 *     }
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
