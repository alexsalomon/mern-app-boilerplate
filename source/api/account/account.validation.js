const Joi = require('joi')
const config = require('../../config')
const { roles } = require('../../services/auth')

module.exports = {
  // POST /users
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .min(config.auth.local.password.minLength)
        .max(config.auth.local.password.maxLength),
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
        .min(config.auth.local.password.minLength)
        .max(config.auth.local.password.maxLength),
      role: Joi.any().only(roles),
    },
  },

  // DELETE /account
  deleteAccount: {
  },
}
