const util = require('nps-utils')

// turn off max length eslint rule for better readability of scripts file.
/* eslint max-len: 0 */

module.exports = {
  scripts: {
    default: {
      description: 'Runs when executing npm start or nps: starts project on production mode.',
      script: `${util.crossEnv('NODE_ENV=production')} node ./index.js`,
    },
    dev: {
      default: {
        description: 'starts the project on development mode.',
        script: `${util.crossEnv('NODE_ENV=development')} nodemon --require pretty-error/start ./index.js`,
      },
    },
    docker: {
      description: 'Runs the project using docker.',
      default: 'docker-compose down && docker-compose build --force-rm && docker-compose up',
    },
    lint: {
      default: 'eslint source/** test/**',
      fix: util.series.nps('lint --fix'),
    },
    test: {
      default: util.series('nps lint.fix', 'nps test.all'),
      all: `${util.crossEnv('NODE_ENV=test')} nyc --reporter=html --reporter=text mocha --recursive --colors test/setup.spec.js source/ --exit`,
      coverage: 'open coverage/index.html',
    },
    docs: {
      description: 'Creates API documentation from the *.docs.js files',
      default: "apidoc -f '.*\\.docs.js$' -i source/ -o docs/",
    },
  },
}
