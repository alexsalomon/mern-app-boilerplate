const config = {
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
}

module.exports = config
