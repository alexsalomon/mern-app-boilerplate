const express = require('express')
const routesUtil = require('../../util/routes.util')
const AuthServices = require('../../services/auth')
const UserController = require('./user.controller')

const router = new express.Router()

// Authorization middleware
const authenticate = AuthServices.authenticate

// getAllUsers
/**
 * @api {post} /user Retrieves all users
 * @apiName GetAllUsers
 * @apiGroup User
 *
 * @apiHeader {String} jwt-token The unique access-key token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiSuccess {Array} A list of all registered users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *            "_id": "5c018fab93ea1b6ba494ad99",
 *            "email": "testinguser2@testinguser.com",
 *           "createdAt": "2018-11-30T19:29:47.971Z",
 *            "updatedAt": "2018-11-30T19:29:47.971Z",
 *            "__v": 0
 *        },
 *        {
 *           "_id": "5c05741bec81482fdcd2c1fe",
 *           "email": "testinguser@testinguser.com",
 *            "createdAt": "2018-12-03T18:21:15.615Z",
 *           "updatedAt": "2018-12-03T18:21:15.615Z",
 *            "__v": 0
 *        },
 *        {
 *           "_id": "5c17a88389904839b71c6b3c",
 *           "email": "testing@testing.testing",
 *            "createdAt": "2018-12-17T13:45:39.176Z",
 *           "updatedAt": "2018-12-17T13:45:39.176Z",
 *           "__v": 0
 *        },
 *    ]
 *
 */
router.get(
  '/',
  authenticate,
  routesUtil.controllerHandler(UserController.getAllUsers),
)

// getUser
/**
 * @api {post} /register Register a User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} jwt-token The unique access-key token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String} id The user's ID
 *
 * @apiSuccess {Object} The requested user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "5c17a88389904839b71c6b3c",
 *        "email": "testing@testing.testing",
 *        "createdAt": "2018-12-17T13:45:39.176Z",
 *        "updatedAt": "2018-12-17T13:45:39.176Z",
 *        "__v": 0
 *     },
 *
 * @apiError BadRequest Invalid user ID
 * @apiError NotFound Could not find the user requested
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "BadRequest",
 *       "error": "Error message"
 *     }
 */
router.get(
  '/:id',
  authenticate,
  routesUtil.controllerHandler(
    UserController.getUser,
    req => [req.params.id],
  ),
)

// deleteUser
/**
 * @api {post} /register Register a User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} jwt-token The unique access-key token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String} id The user's ID
 *
 * @apiSuccess {Object} The requested user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "5c17a88389904839b71c6b3c",
 *        "email": "testing@testing.testing",
 *        "createdAt": "2018-12-17T13:45:39.176Z",
 *        "updatedAt": "2018-12-17T13:45:39.176Z",
 *        "__v": 0
 *     },
 *
 * @apiError BadRequest Invalid user ID
 * @apiError NotFound Could not find the user requested
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "BadRequest",
 *       "error": "Error message"
 *     }
 */
router.delete(
  '/:id',
  authenticate,
  routesUtil.controllerHandler(
    UserController.deleteUser,
    req => [req.params.id],
  ),
)

// updateUser
/**
 * @api {post} /register Register a User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} jwt-token The unique access-key token.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String} id The user's ID
 *
 * @apiSuccess {Object} The requested user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "5c17a88389904839b71c6b3c",
 *        "email": "testing@testing.testing",
 *        "createdAt": "2018-12-17T13:45:39.176Z",
 *        "updatedAt": "2018-12-17T13:45:39.176Z",
 *        "__v": 0
 *     },
 *
 * @apiError BadRequest Invalid user ID
 * @apiError NotFound Could not find the user requested
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "BadRequest",
 *       "error": "Error message"
 *     }
 */
router.put(
  '/:id',
  authenticate,
  routesUtil.controllerHandler(
    UserController.updateUser,
    req => [req.params.id, req.body],
  ),
)


module.exports = router
