const Joi = require('joi')

module.exports = {
  // GET /users
  getAllUsers: {
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

  // DELETE /users/:id
  deleteUser: {
    param: {
      id: Joi.string().required(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },

  // UPDATE /users/:id
  updateUser: {
    param: {
      id: Joi.string().required(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },
}
