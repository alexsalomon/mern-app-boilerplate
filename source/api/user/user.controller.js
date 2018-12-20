const HttpStatus = require('http-status')
const APIError = require('../../services/errors/api.error')
const User = require('./user.model')

/**
 * Returns all user.
 * @param {string} id The user's ID.
 * @returns {Array} All the users in the database.
 */
async function getAllUsers() {
  const users = await User.find({}, { password: 0 })
  return users
}

/**
 * Returns a user based on the userId.
 * @param {string} id The user's ID.
 * @returns {Object} The user requested.
 */
async function getUser(id) {
  const user = await User.findById(id, { password: 0 })
  if (!user) {
    throw new APIError({ status: HttpStatus.NOT_FOUND, message: 'User not found.' })
  }
  return user
}

/**
 * Deletes a user.
 * @param {string} id The user's ID.
 * @returns {Object} The deleted user.
 */
async function deleteUser(id) {
  const user = await User.findByIdAndRemove(id)
  return user
}

/**
 * Updates a user.
 * @param {string} id The user's ID.
 * @param {Object} userParams The user's parameters.
 * @returns {Object} The updated user.
 */
async function updateUser(id, userParams) {
  await User.findByIdAndUpdate(id, userParams)
  const user = await User.findById(id, { password: 0 })
  return user
}

module.exports = { getAllUsers, getUser, deleteUser, updateUser }
