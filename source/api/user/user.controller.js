const HttpStatus = require('http-status')
const { APIError } = require('../../util/errors')
const User = require('./user.model')

/**
 * Creates a new user.
 * @param {string} firstName The user's first name.
 * @param {string} lastName The user's last name.
 * @param {Object} email The user's email.
 * @param {Object} password The user's password.
 * @returns {Object} The created user.
 */
async function createUser(firstName, lastName, email, password) {
  const user = await User.create({ firstName, lastName, email, password })
  return user.toPublic()
}

/**
 * Returns all user.
 * @param {string} id The user's ID.
 * @returns {Array} All the users in the database.
 */
async function listUsers() {
  const users = await User.find({})
  return users.map(user => user.toPublic())
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
  return user.toPublic()
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
  return user.toPublic()
}

/**
 * Deletes a user.
 * @param {string} id The user's ID.
 * @returns {Object} The deleted user.
 */
async function deleteUser(id) {
  const user = await User.findByIdAndRemove(id)
  return user.toPublic()
}


module.exports = { createUser, listUsers, getUser, updateUser, deleteUser }
