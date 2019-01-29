// ================================================================================================
// ================================================================================================
// ================================================================================================

/**
 * @api {get} /account Get Account
 * @apiDescription Gets the current logged in user's account information.
 * @apiVersion 1.0.0
 * @apiName GetProfile
 * @apiGroup Account
 * @apiPermission user
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
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
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users have access to this resource
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to this resource."
 *        }
 *     }
 */

// ================================================================================================
// ================================================================================================
// ================================================================================================

/**
 * @api {patch} /account Update Account
 * @apiDescription Updates the current user account.
 * @apiVersion 1.0.0
 * @apiName GetUpdateAccount
 * @apiGroup Account
 * @apiPermission user
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
 *     }
 *
 * @apiParam {String}             [firstName]       User's first name
 * @apiParam {String}             [lastName]        User's last name
 * @apiParam {String}             [email]           User's email
 * @apiParam {String{8..128}}     [password]        User's password
 * @apiParam {String=user,admin}  [role]            User's role
 * (You must be an admin to change the user's role).
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
 * @apiError (Bad Request 400)   ValidationError  Some parameters are invalid
 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users have
 *                                                    access to this resource
 * @apiError (Not Found 404)     NotFound         User does not exist
 *
 * @apiErrorExample BadRequest-Response
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "error": {
 *          "status": "400",
 *          "message": "Validation Error."
 *        }
 *     }
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to this resource."
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

// ================================================================================================
// ================================================================================================
// ================================================================================================

/**
 * @api {delete} /account Terminate Account
 * @apiDescription Terminates the current user account by deleting the user.
 * @apiVersion 1.0.0
 * @apiName GetTerminateAccount
 * @apiGroup Account
 * @apiPermission user
 *
 * @apiHeader {String}  Authorization  User's accessToken needed for identification/authorization
 * @apiHeaderExample {json} Header-Example
 *     {
 *       "Authorization": "Bearer eyJpsdDsdZCI6IjVjMDAzM2NjNWRhNiIsImlhdCI6MTU0"
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
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users have access to this resource
 *
 * @apiErrorExample Unauthorized-Response
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "error": {
 *          "status": "401",
 *          "message": "Only authenticated users have access to this resource."
 *        }
 *     }
 */

// ================================================================================================
// ================================================================================================
// ================================================================================================
