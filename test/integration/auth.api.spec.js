const chai = require('chai')
const dirtyChai = require('dirty-chai')

// const expect = chai.expect
chai.use(dirtyChai)

describe('Integration Tests: Auth API', () => {
  beforeEach(async () => {

  })

  describe('POST /register', () => {
    it.skip('should register a new user when request is valid', () => {})

    it.skip('should report bad request error when required parameters are not provided', () => {})

    it.skip('should report bad request error when email provided is invalid', () => {})

    it.skip('should report conflict error when email already exists', () => {})

    it.skip('should report bad request error when password length is less than 8', () => {})
  })

  describe('POST /login', () => {
    it.skip('should return an accessToken when email and password match', () => {})

    it.skip('should report bad request error when required parameters are not provided', () => {})

    it.skip('should report bad request error when email provided is invalid', () => {})

    it.skip('should report NotFound error when email does not match any records', () => {})

    it.skip('should report unauthorized error when email and password do NOT match', () => {})
  })
})

