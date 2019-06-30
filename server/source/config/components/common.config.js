const config = {
  env: {
    format: ['development', 'test', 'production', 'staging'],
    default: 'production',
    arg: 'env',
    env: 'NODE_ENV',
  },
  server: {
    port: {
      format: 'port',
      default: 8080,
      arg: 'port',
      env: 'PORT',
    },
  },
}


module.exports = config
