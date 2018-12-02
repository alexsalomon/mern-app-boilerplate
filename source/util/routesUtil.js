'use strict'

/**
 * Handles controller execution and sends a json response to the client
 * @param {Promise} promise - Controller handler.
 * @param {function(req=, res=, next=)} params - maps our desired controller parameters.
 * @returns {json} - the response to the client
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : []
  try {
    const result = await promise(...boundParams)
    return res.json(result || { message: 'OK' })
  } catch (error) {
    return next(error)
  }
}

module.exports = { controllerHandler }
