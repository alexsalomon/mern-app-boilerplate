const sinon = require('sinon')
const expect = require('chai').expect
const httpMocks = require('node-mocks-http')
const logger = require('../logger')
const errorHandler = require('./errorHandler.services')

describe('Services: Error Handler', () => {
  let req
  let res
  let next

  beforeEach(() => {
    this.sandbox = sinon.createSandbox()

    process.exit.restore()
    this.sandbox.stub(process, 'exit')
    this.sandbox.stub(logger, 'error')
    this.sandbox.stub(logger, 'warn')

    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = err => {
      if (err instanceof Error) {
        throw err
      }
    }
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  describe('handleOperationalError()', () => {
    it('should log the error', () => {
      const err = { isOperational: true, message: 'test message', status: 999, getFormattedError: () => {} }
      errorHandler.handleError(err, req, res, next)
      expect(logger.warn).to.have.been.calledOnce()
    })

    it('should send a json response back to the client', () => {
      this.sandbox.spy(res, 'status')
      this.sandbox.spy(res, 'json')

      const err = { isOperational: true, message: 'test message', status: 999, getFormattedError: () => {} }
      errorHandler.handleError(err, req, res, next)
      expect(res.status).to.have.been.calledOnceWith(err.status)
      expect(res.json).to.have.been.calledOnce()
    })
  })

  describe('handleProgrammerError()', () => {
    it('should log the error and terminate the program', () => {
      const err = { isOperational: false, message: 'test message', status: 999 }
      errorHandler.handleError(err, req, res, next)
      expect(process.exit).to.have.been.called()
      expect(logger.error).to.have.been.calledOnce()
    })
  })
})
