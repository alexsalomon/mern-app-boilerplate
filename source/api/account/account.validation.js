const Joi = require('joi')
const config = require('../../config')
const User = require('../user/user.model')

module.exports = {
  // POST /users
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .min(config.auth.password.minLength)
        .max(config.auth.password.maxLength),
    },
  },

  // GET /account
  getAccount: {
  },

  // PATCH /account
  updateAccount: {
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
        .min(config.auth.password.minLength)
        .max(config.auth.password.maxLength),
      role: Joi.any().only(User.roles),
    },
  },

  // DELETE /account
  deleteAccount: {
  },
}
