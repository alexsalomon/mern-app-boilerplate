const Joi = require('joi')

module.exports = {
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

  // POST /users
  createUser: {
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

  // PATCH /users/:id
  updateUser: {
    param: {
      id: Joi.string().required(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },

  // PUT /users/:id
  replaceUser: {
    param: {
      id: Joi.string().required(),
    },
    headers: {
      authorization: Joi.string().required(),
    },
  },
}
