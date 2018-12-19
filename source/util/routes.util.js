/**
 * Handles controller execution, removing the need to wrap every controller in a try/catch
 * block, handle errors and send a json response upon successful execution.
 * Additionally, we can send just the necessary parameters to be handled by the controller.
 * @param {Promise} promise The controller handler.
 * @param {function(req=, res=, next=)} params The desired controller parameters.
 * @returns {json} The response to the client
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : []
  try {
    const result = await promise(...boundParams)
    return res.json(result || { message: 'OK' })
  } catch (err) {
    return next(err)
  }
}


module.exports = { controllerHandler }
