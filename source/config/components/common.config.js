const config = {
  env: {
    format: ['dev', 'test', 'prod', 'stag'],
    default: 'dev',
    arg: 'env',
    env: 'NODE_ENV',
  },
}

module.exports = config
