const config = {
  auth: {
    local: {
      password: {
        minLength: {
          format: 'nat',
          default: 8,
          env: 'PASSWORD_MIN_LENGTH',
        },
        maxLength: {
          format: 'nat',
          default: 128,
          env: 'PASSWORD_MAX_LENGTH',
        },
      },
    },
    jwt: {
      secret: {
        format: String,
        default: 'supersecret',
        env: 'JWT_SECRET',
        sensitive: true,
      },
      saltRounds: {
        format: 'nat',
        default: 10,
        env: 'JWT_SALT_ROUNDS',
      },
      expiresIn: {
        format: 'nat',
        default: 3600,
        args: 'jwtExpiresIn',
        env: 'JWT_EXPIRES_IN',
      },
    },
  },
}


module.exports = config
