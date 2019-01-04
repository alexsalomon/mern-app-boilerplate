const chai = require('chai')
const dirtyChai = require('dirty-chai')

// const expect = chai.expect
chai.use(dirtyChai)


describe('Integration Tests: Account API', () => {
  beforeEach(async () => {

  })

  describe('GET /account', () => {
    it.skip('should provide the logged user\'s information when request is valid', () => {})

    it.skip('should report unauthorized error if user is not authenticated', () => {})
  })

  describe('DELETE /account', () => {
    it.skip('should delete the logged user when request is valid', () => {})

    it.skip('should report unauthorized error if user is not authenticated', () => {})
  })

  describe('PATCH /account', () => {
    it.skip('should update the logged user when request is valid', () => {})

    it.skip('should not update user when no parameters were given', () => {})

    it.skip('should report unauthorized error if user is not authenticated', () => {})
  })
})

