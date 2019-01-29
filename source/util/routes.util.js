const HttpStatus = require('http-status')

/**
 * Handles controller execution, removing the need to wrap every controller in a try/catch block,
 * handling thrown errors automatically and sending a json response upon successful execution.
 * Additionally, only necessary parameters are handed to the controller separating the express
 * routing logic from the business logic.
 * @param {Promise} controller The controller handler.
 * @param {function} params The desired controller parameters.
 * @param {Promise} successResponseStatus The controller handler.
 * @returns {json} The response to the client
 */
function controllerHandler(controller, params, successResponseStatus = HttpStatus.OK) {
  return async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : []
    try {
      const result = await controller(...boundParams)
      return res.status(successResponseStatus).json(result || { message: 'OK' })
    } catch (err) {
      return next(err)
    }
  }
}


module.exports = { controllerHandler }
