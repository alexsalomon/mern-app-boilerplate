const HttpStatus = require('http-status')
const { APIError } = require('../../util/errors')
const { formatUtil } = require('../../util')
const User = require('./user.model')

/**
 * Creates a new user.
 * @param {string} userParams The user's information
 * @returns {Object} The created user.
 */
async function createUser(userParams) {
  const user = await User.create(userParams)
  return {
    user: user.toPublic(),
  }
}

/**
 * Returns all user.
 * @param {string} id The user's ID.
 * @returns {Array} All the users in the database.
 */
async function listUsers() {
  const users = await User.find({})
  return {
    users: users.map(user => user.toPublic()),
  }
}

/**
 * Returns a user based on the userId.
 * @param {string} id The user's ID.
 * @returns {Object} The user requested.
 */
async function getUser(id) {
  const user = await User.findById(id)
  if (!user) {
    throw new APIError({
      status: HttpStatus.NOT_FOUND,
      message: 'User not found.',
    })
  }
  return {
    user: user.toPublic(),
  }
}

/**
 * Updates a user.
 * @param {string} id The user's ID.
 * @param {Object} userParams The user's information.
 * @returns {Object} The updated user.
 */
async function updateUser(id, userParams) {
  const formattedParams = formatUtil.removeInvalidKeys(userParams)
  await User.findByIdAndUpdate(id, formattedParams)

  const user = await User.findById(id)
  if (!user) {
    throw new APIError({
      status: HttpStatus.NOT_FOUND,
      message: 'User not found.',
    })
  }

  return {
    user: user.toPublic(),
  }
}

/**
 * Deletes a user.
 * @param {string} id The user's ID.
 * @returns {Object} The deleted user.
 */
async function deleteUser(id) {
  const user = await User.findByIdAndRemove(id)
  if (!user) {
    throw new APIError({
      status: HttpStatus.NOT_FOUND,
      message: 'User not found.',
    })
  }
  return {
    user: user.toPublic(),
  }
}


module.exports = { createUser, listUsers, getUser, updateUser, deleteUser }
