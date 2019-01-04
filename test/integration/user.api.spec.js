const chai = require('chai')
const dirtyChai = require('dirty-chai')

// const expect = chai.expect
chai.use(dirtyChai)

describe('Integration Tests: Users API', () => {
  beforeEach(async () => {

  })

  describe('POST /users', () => {
    it.skip('should create a new user when request is valid', () => {})

    it.skip('should create a new user and set default role to "user"', () => {})

    it.skip('should report conflict error when email already exists', () => {})

    it.skip('should report bad request error when required parameters are not provided', () => {})

    it.skip('should report bad request error when password length is less than 8', () => {})

    it.skip('should report unauthorized error when user is not logged in', () => {})

    it.skip('should report forbidden error when user is not admin', () => {})
  })

  describe('GET /users', () => {
    it.skip('should provide a list of all users when request is valid', () => {})

    it.skip('should get all users with pagination when request is valid', () => {})

    it.skip('should filter users when request is valid', () => {})

    it.skip('should report bad request error when pagination\'s parameters are not a number', () => {})

    it.skip('should report bad request error when role is not admin or user', () => {})

    it.skip('should report bad request error when email is not a valid email', () => {})

    it.skip('should report unauthorized error if user is not authenticated', () => {})

    it.skip('should report forbidden error if logged user is not an admin', () => {})
  })

  describe('GET /users/:id', () => {
    it.skip('should provide user information for a user when request is valid', () => {})

    it.skip('should report NotFound error when user does not exist', () => {})

    it.skip('should report NotFound error when :id is not a valid ObjectID', () => {})

    it.skip('should report unauthorized error if user is not authenticated', () => {})

    it.skip('should report forbidden error if logged user is not an admin', () => {})
  })

  describe('PATCH /users/:id', () => {
    it.skip('should update a user when request is valid', () => {})

    it.skip('should not update user when no parameters were given', () => {})

    it.skip('should report NotFound error when user does not exist', () => {})

    it.skip('should report NotFound error when :id is not a valid ObjectID', () => {})

    it.skip('should report unauthorized error if user is not authenticated', () => {})

    it.skip('should report forbidden error if logged user is not an admin', () => {})
  })

  describe('DELETE /users/:id', () => {
    it.skip('should delete a user when request is valid', () => {})

    it.skip('should report NotFound error when user does not exist', () => {})

    it.skip('should report NotFound error when :id is not a valid ObjectID', () => {})

    it.skip('should report unauthorized error if user is not authenticated', () => {})

    it.skip('should report forbidden error if logged user is not an admin', () => {})
  })
})

