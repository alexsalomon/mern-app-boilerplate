const express = require('express')
const validate = require('express-validation')
const routesUtil = require('../../util/routes.util')
const AuthController = require('./auth.controller')
const AuthValidation = require('./auth.validation')

const router = new express.Router()

/**
 * @api {post} /register Register
 * @apiDescription Register a new user.
 * @apiVersion 1.0.0
 * @apiName PostRegister
 * @apiGroup Authentication
 * @apiPermission public
 *
 * @apiParam {String}           firstName   User's first name
 * @apiParam {String}           lastName    User's last name
 * @apiParam {String}           email       User's email
 * @apiParam {String{8..128}}   password    User's password
 *
 * @apiParamExample {json} Request-Example
 *     {
 *       "firstName": "First",
 *       "lastName": "Last",
 *       "email": "example@email.com",
 *       "password": "userpassword123"
 *     }
 *
 * @apiSuccess (Created 201) {String}  token.tokenType     Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken   Authorization Token
 * @apiSuccess (Created 201) {Number}  token.expiresIn     Access Token's expiration
 *                                                            time in miliseconds
 * @apiSuccess (Created 201) {String}  token.timezone      The server's Timezone
 *
 * @apiSuccess (Created 201) {String}  user.firstName      User's first name
 * @apiSuccess (Created 201) {String}  user.lastName       User's last name
 * @apiSuccess (Created 201) {String}  user.email          User's email
 * @apiSuccess (Created 201) {String}  user.role           User's role
 * @apiSuccess (Created 201) {Date}    user.createdAt      User's creation timestamp
 * @apiSuccess (Created 201) {Date}    user.updatedAt      User's last update timestamp
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 201 OK
 *    {
 *      "token": {
 *        "tokenType": "JWT",
 *        "accessToken": "eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0",
 *        "expiresIn": "3600",
 *        "timezone": "Example timezone"
 *      },
 *      "user": {
 *        "firstName": "First",
 *        "lastName": "Last",
 *        "email": "example@email.com",
 *        "role": "admin",
 *        "createdAt": "2018-11-30T19:29:47.971Z",
 *        "updatedAt": "2018-11-30T19:29:47.971Z"
 *      }
 *    }
 *
 * @apiError (Bad Request 400)  ValidationError  Some required parameters are missing
 *                                                  or contain invalid values
 * @apiError (Conflict 409)     Conflict         Email is not unique
 *
 * @apiErrorExample Error-Response
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "error": {
 *          "status": "400",
 *          "message": "Validation error",
 *          "errors": "error example"
 *        }
 *     }
 *
 * @apiErrorExample Conflict-Response
 *     HTTP/1.1 409 Conflict
 *     {
 *        "error": {
 *          "status": "409",
 *          "message": "User as already been registered."
 *        }
 *     }
 *
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
 * @api {post} /login Login
 * @apiDescription Log a user in to access secure resources.
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission public
 *
 * @apiParam {String}           email       User's email
 * @apiParam {String{8..128}}   password    User's password
 *
 * @apiParamExample {json} Request-Example
 *     {
 *       "email": "example@email.com",
 *       "password": "userpassword123"
 *     }
 *
 * @apiSuccess (Created 201) {String}  token.tokenType     Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken   Authorization Token
 * @apiSuccess (Created 201) {Number}  token.expiresIn     Access Token's expiration
 *                                                            time in miliseconds
 * @apiSuccess (Created 201) {String}  token.timezone      The server's Timezone
 *
 * @apiSuccess (Created 201) {String}  user.firstName      User's first name
 * @apiSuccess (Created 201) {String}  user.lastName       User's last name
 * @apiSuccess (Created 201) {String}  user.email          User's email
 * @apiSuccess (Created 201) {String}  user.role           User's role
 * @apiSuccess (Created 201) {Date}    user.createdAt      User's creation timestamp
 * @apiSuccess (Created 201) {Date}    user.updatedAt      User's last update timestamp
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 201 OK
 *    {
 *      "token": {
 *        "tokenType": "JWT",
 *        "accessToken": "eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0",
 *        "expiresIn": "3600",
 *        "timezone": "Example timezone"
 *      },
 *      "user": {
 *        "firstName": "First",
 *        "lastName": "Last",
 *        "email": "example@email.com",
 *        "role": "admin",
 *        "createdAt": "2018-11-30T19:29:47.971Z",
 *        "updatedAt": "2018-11-30T19:29:47.971Z"
 *      }
 *    }
 *
 * @apiError (Bad Request 400)  ValidationError  Some required parameters are missing
 *                                                  or contain invalid values
 * @apiError (Not Found 404)    NotFound         User email does not match records
 * @apiError (Unauthorized 401) Unauthorized     Incorrect email and password combination
 *
 * @apiErrorExample BadRequest-Response
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "error": {
 *          "status": "400",
 *          "message": "Validation error.",
 *          "errors": "error example"
 *        }
 *     }
 *
  * @apiErrorExample NotFound-Response
 *     HTTP/1.1 404 Not Found
 *     {
 *        "error": {
 *          "status": "404",
 *          "message": "User email does not match records."
 *        }
 *     }
 *
  * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Invalid email and password combination."
 *        }
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
