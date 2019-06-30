const MailEngine = require('email-templates')
const errorHandler = require('../errorHandler')
const logger = require('../logger')
const mailerConfig = require('./mailer.config')


/**
 * A service for sending emails.
 */
class Mailer {
  constructor() {
    this.mailer = new MailEngine(mailerConfig)
  }

  /**
   * Sends an email with the provided options.
   * For a complete list of message options visit: <https://nodemailer.com/message/>
   *
   * @param {object} options - The email options.
   * @returns {void}
   */
  async send(options) {
    try {
      const messageInfo = await this.mailer.send(options)
      logger.info('Email successfully sent.', messageInfo)
    } catch (err) {
      errorHandler.handleError(err)
    }
  }
}


module.exports = new Mailer()
