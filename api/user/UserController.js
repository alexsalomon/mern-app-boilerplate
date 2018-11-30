'use strict'

const ApiError = require('http-errors')
const User = require('./User')

async function getAllUsers() {
  const users = await User.find({}, { password: 0 })
  return users
}

async function getUser(id) {
  const user = await User.findById(id, { password: 0 })
  if (!user) {
    throw new ApiError.NotFound('User not found.')
  }
  return user
}

async function deleteUser(id) {
  const user = await User.findByIdAndRemove(id)
  return user
}

async function updateUser(id, userParams) {
  await User.findByIdAndUpdate(id, userParams)
  return User.findById(id, { password: 0 })
}

module.exports = { getAllUsers, getUser, deleteUser, updateUser }
