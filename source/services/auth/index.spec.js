const chai = require('chai')
const dirtyChai = require('dirty-chai')

// const expect = chai.expect
chai.use(dirtyChai)

describe('Services: Auth', () => {
  it.skip('should verify token when valid', () => {
    // set token to the request
    // verify all necessary information (userId, expiresIn, timezone, etc) have been added to the req object
  })

  it.skip('should throw unauthorized when token is invalid', () => {

  })

  it.skip('should throw unauthorized when token has expired', () => {

  })

  it.skip('should throw unauthorized when token is not provided', () => {

  })

  it.skip('should throw forbidden when authenticated user does not have permission to access resource', () => {

  })
})

