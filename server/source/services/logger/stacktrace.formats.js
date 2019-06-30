const { format } = require('winston')


/**
 * A custom winston logger format that displays the stack trace in the logs.
 */
const stacktrace = format.printf(info => {
  if (info.meta && info.meta instanceof Error) {
    return `[${info.timestamp}] ${info.level} ${info.message} : ${info.meta.stack}`
  }
  return `[${info.timestamp}] ${info.level}: ${info.message}`
})


module.exports = stacktrace
