const config = {
  auth: {
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
}

module.exports = config
