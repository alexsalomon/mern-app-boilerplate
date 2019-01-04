const Joi = require('joi')
const config = require('../../config')

module.exports = {
  // POST /users
  createUser: {
    headers: {
      authorization: Joi.string().required(),
    },
    body: {
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .min(config.auth.password.minLength)
        .max(config.auth.password.maxLength),
    },
  },

  // GET /users
  listUsers: {
    headers: {
      authorization: Joi.string().required(),
    },
  },

  // GET /users/:id
  getUser: {
    param: {
      id: Joi.string().required(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },

  // PATCH /users/:id
  updateUser: {
    param: {
      id: Joi.string().required(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },

  // DELETE /users/:id
  deleteUser: {
    param: {
      id: Joi.string().required(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },
}
