const Joi = require('joi')
const config = require('../../config')

module.exports = {
  // POST /register
  register: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .min(config.auth.password.minLength)
        .max(config.auth.password.maxLength),
    },
  },

  // POST /login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().max(config.auth.password.maxLength),
    },
  },
}
