const HttpStatus = require('http-status')
const { APIError } = require('../../services/errorHandler/errors')
const { objectUtil } = require('../../util')
const config = require('../../config')
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
 * Returns all user with the specified filters and pagination settings.
 * @param {Object} filters The values used for filtering results.
 * @param {Object} pagination The values used for pagination.
 * @param {Object} sorting The values used for sorting.
 * @returns {Array} All the users in the database after filtering, sorting and paging.
 */
async function listUsers(filters, pagination, sorting) {
  filters = objectUtil.removeInvalidProperties(filters)

  const defaultPaginationValues = {
    page: config.api.users.pagination.startPage,
    perPage: config.api.users.pagination.perPage,
  }
  pagination = objectUtil.removeInvalidProperties(pagination)
  pagination = { ...defaultPaginationValues, ...pagination }

  const defaultSortingValues = {
    fields: config.api.users.sorting.fields,
  }
  sorting = objectUtil.removeInvalidProperties(sorting)
  sorting = { ...defaultSortingValues, ...sorting }

  const count = await User.countDocuments(filters)

  const users = await User
    .find(filters)
    .sort(sorting.fields)
    .skip(pagination.perPage * (pagination.page - 1))
    .limit(pagination.perPage)

  return {
    count,
    perPage: pagination.perPage,
    page: pagination.page,
    users: users.map(user => user.toPublic()),
  }
}

/**
 * Returns a user based on the userId.
 * @param {string} id The user's ID.
 * @returns {Object} The user requested.
 */
async function getUser(id) {
  try {
    const user = await User.findById(id)
    return {
      user: user.toPublic(),
    }
  } catch (err) {
    throw new APIError({
      status: HttpStatus.NOT_FOUND,
      message: 'User not found.',
    })
  }
}

/**
 * Updates a user.
 * @param {string} id The user's ID.
 * @param {Object} userParams The user's information.
 * @returns {Object} The updated user.
 */
async function updateUser(id, userParams) {
  try {
    const formattedParams = objectUtil.removeInvalidProperties(userParams)
    await User.findByIdAndUpdate(id, formattedParams)
    const user = await User.findById(id)
    return {
      user: user.toPublic(),
    }
  } catch (err) {
    throw new APIError({
      status: HttpStatus.NOT_FOUND,
      message: 'User not found.',
    })
  }
}

/**
 * Deletes a user.
 * @param {string} id The user's ID.
 * @returns {Object} The deleted user.
 */
async function deleteUser(id) {
  try {
    const user = await User.findByIdAndRemove(id)
    return {
      user: user.toPublic(),
    }
  } catch (err) {
    throw new APIError({
      status: HttpStatus.NOT_FOUND,
      message: 'User not found.',
    })
  }
}


module.exports = { createUser, listUsers, getUser, updateUser, deleteUser }
