'use strict'

const expect = require('chai').expect
const lib = require('../')

describe('lib module', () => {
  it('exposes a server object', () => {
    expect(lib).to.have.property('server')
  })
})
