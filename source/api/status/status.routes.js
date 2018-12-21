const express = require('express')

const router = new express.Router()

/**
 * @api {get} /status Check Status
 * @apiDescription Returns a successful response if the server is
 *                 able to receive requests and send responses back.
 * @apiVersion 1.0.0
 * @apiName GetStatus
 * @apiGroup Status
 * @apiPermission public
 *
 * @apiSuccess {String} message Acknowledgement of successfully received message
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "OK",
 *     }
 */
router.get('/status', (req, res) => res.json({ message: 'OK' }))

module.exports = router
