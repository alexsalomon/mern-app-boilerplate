const Joi = require('joi')
const config = require('../../config')
const { roles } = require('../../services/auth')


module.exports = {
  /**
  * {GET} /account
  */
  getAccount: {
  },

  /**
  * {PATCH} /account
  */
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

  /**
  * {DELETE} /account
  */
  deleteAccount: {
  },
}
