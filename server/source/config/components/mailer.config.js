const path = require('path')

// turn off max length eslint rule for better readability of this configuration file.
/* eslint max-len: 0 */

const config = {
  mailer: {
    message: {
      from: {
        doc: 'The email address used in the from field.',
        format: String,
        default: '',
        arg: 'mailerMessageFrom',
        env: 'MAILER_MESSAGE_FROM',
      },
    },
    templates: {
      root: {
        doc: 'Email templates location.',
        format: String,
        default: path.join(__dirname, '../../../templates/emails'),
        arg: 'mailerTemplatesRoot',
        env: 'MAILER_TEMPLATES_ROOT',
      },
      engine: {
        doc: 'Email templating engine.',
        format: String,
        default: 'pug',
        arg: 'mailerTemplatesEngine',
        env: 'MAILER_TEMPLATES_ENGINE',
      },
    },
    assets: {
      root: {
        doc: 'Email assets location.',
        format: String,
        default: path.join(__dirname, '../../../assets'),
        arg: 'mailerAssetsRoot',
        env: 'MAILER_ASSETS_ROOT',
      },
    },
    transport: {
      service: {
        doc: 'A nodemailer compatible service. Check out "https://nodemailer.com/smtp/well-known/" for a complete list of options.',
        format: String,
        default: 'Postmark',
        arg: 'mailerTransportService',
        env: 'MAILER_TRANSPORT_SERVICE',
      },
      user: {
        doc: 'The username used to authenticate your account with a service provider.',
        format: String,
        default: '',
        arg: 'mailerTransportUser',
        env: 'MAILER_TRANSPORT_USER',
      },
      pass: {
        doc: 'The password used to authenticate your account with a service provider.',
        format: String,
        default: '',
        arg: 'mailerTransportPass',
        env: 'MAILER_TRANSPORT_PASS',
      },
    },
    send: {
      doc: 'Enables/disables email sending functionality on dev and test environments.',
      format: Boolean,
      default: true,
      arg: 'mailerSend',
      env: 'MAILER_SEND',
    },
    debug: {
      doc: 'Enables/disables email debugging options.',
      format: Boolean,
      default: false,
      arg: 'mailerDebug',
      env: 'MAILER_DEBUG',
    },
  },
}


module.exports = config
