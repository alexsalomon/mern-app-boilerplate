const express = require('express')
const validate = require('express-validation')
const HttpStatus = require('http-status')
const { routesUtil } = require('../../util')
const UserController = require('./user.controller')
const UserValidation = require('./user.validation')

const router = new express.Router()

/**
 * @api {post} /users Create User
 * @apiDescription Create a new user.
 * @apiVersion 1.0.0
 * @apiName PostCreateUser
 * @apiGroup User Admin
 * @apiPermission admin
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String}             firstName       User's first name
 * @apiParam {String}             lastName        User's last name
 * @apiParam {String}             email           User's email
 * @apiParam {String{8..128}}     password        User's password
 * @apiParam {String=user,admin}  [role]          User's role
 *
 * @apiParamExample {json} Request-Example
 *     {
 *       "firstName": "First",
 *       "lastName": "Last",
 *       "email": "example@email.com",
 *       "password": "userpassword123",
 *       "role": "user"
 *     }
 *
 * @apiSuccess (Created 201) {String}     firstName      User's first name
 * @apiSuccess (Created 201) {String}     lastName       User's last name
 * @apiSuccess (Created 201) {String}     email          User's email
 * @apiSuccess (Created 201) {String}     role           User's role
 * @apiSuccess (Created 201) {Date}       createdAt      User's creation timestamp
 * @apiSuccess (Created 201) {Date}       updatedAt      User's last update timestamp
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 OK
 *     {
 *        "firstName": "First",
 *        "lastName": "Last",
 *        "email": "example@email.com",
 *        "role": "user",
 *        "createdAt": "2018-11-30T19:29:47.971Z",
 *        "updatedAt": "2018-11-30T19:29:47.971Z"
 *     }
 *
 * @apiError (Bad Request 400)    ValidationError   Some required parameters are missing
 *                                                    or contain invalid values
 * @apiError (Conflict 409)       Conflict          Email is not unique
 * @apiError (Unauthorized 401)   Unauthorized      Only authenticated users can perform this
 *                                                    operation
 * @apiError (Forbidden 403)      Forbidden         Only administrators can perform this operation
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
 * @apiErrorExample Conflict-Response
 *     HTTP/1.1 409 Conflict
 *     {
 *        "error": {
 *          "status": "409",
 *          "message": "User has already been registered."
 *        }
 *     }
 *
 * @apiErrorExample Forbidden-Response
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "error": {
 *          "status": "403",
 *          "message": "User does not have permission to access resource."
 *        }
 *     }
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to the resource."
 *        }
 *     }
 */
router.post(
  '/',
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
 * @api {get} /users List Users
 * @apiDescription Get a list of all registered users.
 * @apiVersion 1.0.0
 * @apiName GetListUsers
 * @apiGroup User Admin
 * @apiPermission admin
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam  {Number{1-}}         [page=1]       Page number (pagging)
 * @apiParam  {Number{1-100}}      [perPage=50]    Number of users per page (pagging)
 * @apiParam  {String}             [firstName]    User's first name (filter)
 * @apiParam  {String}             [lastName]     User's last name (filter)
 * @apiParam  {String}             [email]        User's email (filter)
 * @apiParam  {String=user,admin}  [role]         User's role (filter)
 *
 * @apiSuccess {Object[]} users A list of all registered users
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "firstName": "First",
 *          "lastName": "Last",
 *          "email": "example@email.com",
 *          "role": "admin",
 *          "createdAt": "2018-11-30T19:29:47.971Z",
 *          "updatedAt": "2018-11-30T19:29:47.971Z"
 *        },
 *        {
 *          "firstName": "John",
 *          "lastName": "Smith",
 *          "email": "johnsmith@email.com",
 *          "role": "user",
 *          "createdAt": "2018-11-30T19:29:47.971Z",
 *          "updatedAt": "2018-11-30T19:29:47.971Z"
 *        },
 *        {
 *          "firstName": "Peter",
 *          "lastName": "Pam",
 *          "email": "peterpam@email.com",
 *          "role": "user",
 *          "createdAt": "2018-11-30T19:29:47.971Z",
 *          "updatedAt": "2018-11-30T19:29:47.971Z"
 *        }
 *    ]
 *
 * @apiError (Bad Request 400)   ValidationError   Some required parameters are missing
 *                                                    or contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized      Only authenticated users can perform this
 *                                                    operation
 * @apiError (Forbidden 403)     Forbidden         Only administrators can perform this operation
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
 * @apiErrorExample Forbidden-Response
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "error": {
 *          "status": "403",
 *          "message": "User does not have permission to access resource."
 *        }
 *     }
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to the resource."
 *        }
 *     }
 */
router.get(
  '/',
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
 * @api {get} /users/:id Get User
 * @apiDescription Get user information.
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User Admin
 * @apiPermission admin
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String}       id             The user's ID
 *
 * @apiSuccess {String}     firstName      User's first name
 * @apiSuccess {String}     lastName       User's last name
 * @apiSuccess {String}     email          User's email
 * @apiSuccess {String}     role           User's role
 * @apiSuccess {Date}       createdAt      User's creation timestamp
 * @apiSuccess {Date}       updatedAt      User's last update timestamp
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *        "firstName": "First",
 *        "lastName": "Last",
 *        "email": "example@email.com",
 *        "role": "admin",
 *        "createdAt": "2018-11-30T19:29:47.971Z",
 *        "updatedAt": "2018-11-30T19:29:47.971Z"
 *     }
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can perform this operation
 * @apiError (Forbidden 403)     Forbidden     Only administrators can perform this operation
 * @apiError (Not Found 404)     NotFound      User does not exist
 *
 * @apiErrorExample Forbidden-Response
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "error": {
 *          "status": "403",
 *          "message": "User does not have permission to access resource."
 *        }
 *     }
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to the resource."
 *        }
 *     }
 *
 * @apiErrorExample NotFound-Response
 *     HTTP/1.1 404 NotFound
 *     {
 *        "error": {
 *          "status": "404",
 *          "message": "The user specified does not match any records."
 *        }
 *     }
 */
router.get(
  '/:id',
  validate(UserValidation.getUser),
  routesUtil.controllerHandler(
    UserController.getUser,
    req => [req.params.id],
  ),
)

/**
 * @api {patch} /users/:id Update User
 * @apiDescription Update some fields of a user document.
 * @apiVersion 1.0.0
 * @apiName PatchUpdateUser
 * @apiGroup User Admin
 * @apiPermission admin
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String}             id                The user's ID
 * @apiParam {String}             [firstName]       User's first name
 * @apiParam {String}             [lastName]        User's last name
 * @apiParam {String}             [email]           User's email
 * @apiParam {String{8..128}}     [password]        User's password
 * @apiParam {String=user,admin}  [role]            User's role
 *
 * @apiParamExample {json} Request-Example
 *     {
 *       "firstName": "First",
 *       "lastName": "Last",
 *       "email": "example@email.com",
 *       "password": "userpassword123"
 *     }
 *
 * @apiSuccess {String}     firstName      User's first name
 * @apiSuccess {String}     lastName       User's last name
 * @apiSuccess {String}     email          User's email
 * @apiSuccess {String}     role           User's role
 * @apiSuccess {Date}       createdAt      User's creation timestamp
 * @apiSuccess {Date}       updatedAt      User's last update timestamp
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *        "firstName": "First",
 *        "lastName": "Last",
 *        "email": "example@email.com",
 *        "role": "admin",
 *        "createdAt": "2018-11-30T19:29:47.971Z",
 *        "updatedAt": "2018-11-30T19:29:47.971Z"
 *     }
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can perform this operation
 * @apiError (Forbidden 403)     Forbidden     Only administrators can perform this operation
 * @apiError (Not Found 404)     NotFound      User does not exist
 *
 * @apiErrorExample Forbidden-Response
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "error": {
 *          "status": "403",
 *          "message": "User does not have permission to access resource."
 *        }
 *     }
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to the resource."
 *        }
 *     }
 *
 * @apiErrorExample NotFound-Response
 *     HTTP/1.1 404 NotFound
 *     {
 *        "error": {
 *          "status": "404",
 *          "message": "The user specified does not match any records."
 *        }
 *     }
 */
router.patch(
  '/:id',
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
 * @api {delete} /users/:id Delete User
 * @apiDescription Delete a user.
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup User Admin
 * @apiPermission admin
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String}       id             The user's ID
 *
 * @apiSuccess {String}     firstName      User's first name
 * @apiSuccess {String}     lastName       User's last name
 * @apiSuccess {String}     email          User's email
 * @apiSuccess {String}     role           User's role
 * @apiSuccess {Date}       createdAt      User's creation timestamp
 * @apiSuccess {Date}       updatedAt      User's last update timestamp
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *        "firstName": "First",
 *        "lastName": "Last",
 *        "email": "example@email.com",
 *        "role": "admin",
 *        "createdAt": "2018-11-30T19:29:47.971Z",
 *        "updatedAt": "2018-11-30T19:29:47.971Z"
 *     }
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can perform this operation
 * @apiError (Forbidden 403)     Forbidden     Only administrators can perform this operation
 * @apiError (Not Found 404)     NotFound      User does not exist
 *
 * @apiErrorExample Forbidden-Response
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "error": {
 *          "status": "403",
 *          "message": "User does not have permission to access resource."
 *        }
 *     }
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to the resource."
 *        }
 *     }
 *
 * @apiErrorExample NotFound-Response
 *     HTTP/1.1 404 NotFound
 *     {
 *        "error": {
 *          "status": "404",
 *          "message": "The user specified does not match any records."
 *        }
 *     }
 */
router.delete(
  '/:id',
  validate(UserValidation.deleteUser),
  routesUtil.controllerHandler(
    UserController.deleteUser,
    req => [req.params.id],
  ),
)


module.exports = router
