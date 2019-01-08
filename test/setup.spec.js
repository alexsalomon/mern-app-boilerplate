const sinon = require('sinon')
const chai = require('chai')
const dirtyChai = require('dirty-chai')

/**
 * Sets up dirty-chai for all tests. This is required to write chai functions
 * with lint-friendly terminating assertions. Remove this and ESLint will complain.
 */
before(() => {
  chai.use(dirtyChai)
})

/**
 * Creates a sandbox that is automatically included in every test.
 * Sandboxes remove the need to keep track of every fake created. Simply
 * use this.mock, this.spy or this.stub instead of sinon.mock/spy/stub and
 * you won't need to manually call the 'restore' function in your tests,
 * 'this.sandbox.restore' does it all for you automatically.
 * For more information visit: https://sinonjs.org/releases/latest/sandbox/
 */
beforeEach(() => {
  this.sandbox = sinon.createSandbox()
})

afterEach(() => {
  this.sandbox.restore()
})
