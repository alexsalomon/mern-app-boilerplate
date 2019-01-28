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
        .min(config.auth.password.minLength)
        .max(config.auth.password.maxLength),
      role: Joi.any().only(roles),
    },
  },

  // GET /users
  listUsers: {
    query: {
      page: Joi.number().integer().positive(),
      perPage: Joi.number().integer().positive(),
      sortOn: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      role: Joi.any().only(roles),
    },
  },

  // GET /users/:id
  getUser: {
    param: {
      id: Joi.string().required(),
    },
  },

  // PATCH /users/:id
  updateUser: {
    param: {
      id: Joi.string().required(),
    },
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
        .min(config.auth.password.minLength)
        .max(config.auth.password.maxLength),
      role: Joi.any().only(roles),
    },
  },

  // DELETE /users/:id
  deleteUser: {
    param: {
      id: Joi.string().required(),
    },
  },
}
