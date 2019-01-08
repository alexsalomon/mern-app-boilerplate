// const chai = require('chai')

// const expect = chai.expect


describe('Services: Logger', () => {
  describe('createLogsDirectory()', () => {
    it.skip('should create logs directory upon initialization if one does not exist', () => {
      // check logs folder does not exist
      // call createLogsDirectory()
      // ensure logs dir exist
    })

    it.skip('should do nothing if logs directory already exist', () => {
      // check logs folder exist with non-empty files inside
      // call createLogsDirectory()
      // ensure logs dir exist
      // ensure files are still there
      // ensure files are exactly the same as before
    })
  })

  describe('getLoggerOptions()', () => {
    it.skip('should return dev options when in development environment', () => {
      // check getLoggerTransportsDev is called
    })

    it.skip('should return test options when in testing environment', () => {
      // check getLoggerTransportsTest is called
    })

    it.skip('should return stag options when in stagging environment', () => {
      // check getLoggerTransportsStag is called
    })

    it.skip('should return prod options when in production environment', () => {
      // check getLoggerTransportsProd is called
    })
  })

  describe('logging', () => {
    it.skip('should log error to combined and error files', () => {
      // check combined.log and error.log to make sure both files are written with the error
    })

    it.skip('should log info to combined file', () => {
      // check combined.log and error.log to make sure both files are written with the error
    })
  })
})

