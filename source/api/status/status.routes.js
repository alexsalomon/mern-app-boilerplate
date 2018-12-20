const express = require('express')
const routesUtil = require('../../util/routes.util')

const router = new express.Router()

/**
 * @api {post} /status Retrieves the status of the server
 * @apiName GetStatus
 * @apiGroup Status
 *
 * @apiSuccess {String} message Acknowledgement of successfully received message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "OK",
 *     }
 */
router.get(
  '/status',
  routesUtil.controllerHandler(() => ({ message: 'OK' })),
)


module.exports = router
