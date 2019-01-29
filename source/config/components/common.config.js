const config = {
  env: {
    format: ['dev', 'test', 'prod', 'stag'],
    default: 'prod',
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
