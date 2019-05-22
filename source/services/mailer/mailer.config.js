const nodemailer = require('nodemailer')
const logger = require('../logger')
const config = require('../../config')

/**
 * Configuration options for Mailer.
 *
 * For a complete list of configuration options check the mail engine's source code:
 * <https://github.com/niftylettuce/email-templates/blob/HEAD/src/index.js>
 *
 * For a complete list of message options visit: <https://nodemailer.com/message/>
 */
const mailerConfig = {
  // default message configuration
  message: {
    from: config.mailer.from,
    cc: config.mailer.from,
  },
  views: {
    // templates location
    root: config.mailer.templates.root,
    options: {
      // templating engine
      extension: config.mailer.templates.engine,
    },
  },
  juiceResources: {
    // assets location
    relativeTo: config.mailer.assets.root,
  },
  // The nodemailer transport object
  // Check out the nodemailer documentation page for more info: <https://nodemailer.com/transports/>
  // A list of built-in nodemailer services: https://nodemailer.com/smtp/well-known/
  transport: nodemailer.createTransport({
    service: config.mailer.transport.service,
    auth: {
      user: config.mailer.transport.user,
      pass: config.mailer.transport.pass,
    },
    logger,
    debug: config.mailer.debug,
  }),
  // Enable or disable email sending functionality on dev and test envs
  send: config.mailer.send,
  // Automatically add a prefix to the message subject when not in production
  subjectPrefix: config.env === 'production' ? false : `[${config.env.toUpperCase()}] `,
}


module.exports = mailerConfig
