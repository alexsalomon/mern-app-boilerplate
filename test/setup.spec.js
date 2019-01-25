const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
const dirtyChai = require('dirty-chai')
const chaiSorted = require('chai-sorted')
const expect = require('chai').expect

/**
 * Sets up chai plugins for all tests:
 *
 * sinon-chai: assertions for using sinon's spy, stub, and mocking framework
 * with the Chai assertion library.
 *
 * dirty-chai: Required to write chai functions with lint-friendly
 * terminating assertions. Remove this and ESLint will complain.
 *
 * chai-as-promised: assertions for testing promises.
 *
 * chai-sorted: assertions for testing if an array has sorted values.
 */
before(() => {
  chai.use(sinonChai)
  chai.use(dirtyChai)
  chai.use(chaiAsPromised)
  chai.use(chaiSorted)
})

/**
 * Creates a sandbox that is automatically included in every test.
 * Sandboxes remove the need to keep track of every fake created. Simply
 * use this.sandbox.mock, this.sandbox.spy or this.sandbox.stub instead of
 * sinon.mock/spy/stub and you won't need to manually call the 'restore'
 * function in your tests, 'this.sandbox.restore' does it all for you automatically.
 * For more information visit: https://sinonjs.org/releases/latest/sandbox/
 */
beforeEach(() => {
  this.sandbox = sinon.createSandbox()

  // Stubs errorHandler's process.exit() so that our tests don't exit without any
  // warnings in case of reaching a programmer error. See 'errorHandler.services.js'.
  this.sandbox.stub(process, 'exit').callsFake(() => {
    expect(process.exit).to.have.not.been.called()
  })
})

afterEach(() => {
  this.sandbox.restore()
})
