const expect = require('chai').expect
const ExtendableError = require('./extendable.error')


describe('Errors: Extendable Error', () => {
  describe('format()', () => {
    it('should return default error format for non-public errors', () => {
      const error = new ExtendableError({ message: 'test message', status: 999, isPublic: false })
      const formattedError = error.format()
      expect(formattedError.error.status).to.be.equal(500)
      expect(formattedError.error.message).to.be.equal('Internal Server Error.')
      expect(formattedError.error.isPublic).to.be.undefined()
      expect(formattedError.error.isOperational).to.be.undefined()
    })

    it('should return custom error format for public errors', () => {
      const error = new ExtendableError({ message: 'test message', status: 999, isPublic: true })
      const formattedError = error.format()
      expect(formattedError.error.status).to.be.equal(999)
      expect(formattedError.error.message).to.be.equal('test message')
      expect(formattedError.error.isPublic).to.be.undefined()
      expect(formattedError.error.isOperational).to.be.undefined()
    })
  })
})
