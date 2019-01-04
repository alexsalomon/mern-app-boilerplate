const chai = require('chai')
const dirtyChai = require('dirty-chai')
const request = require('supertest')
const httpStatus = require('http-status')
const factories = require('../factories/user.factory')
const User = require('../../source/api/user/user.model')
const AuthService = require('../../source/services/auth')
const app = require('../../source/server/index')

const expect = chai.expect
chai.use(dirtyChai)

let adminDbUserInfo
let adminDbUserId
let adminDbUserAccessToken
let loggedInDbUserInfo
let loggedInDbUserId
let loggedInDbUserAccessToken

let adminRequestUserInfo
let loggedInRequestUserInfo

describe('Integration Tests: Users API', () => {
  beforeEach(async () => {
    adminDbUserInfo = factories.validAdminUsers()[0]
    loggedInDbUserInfo = factories.validLoggedUsers()[0]
    adminRequestUserInfo = factories.validAdminUsers()[1]
    loggedInRequestUserInfo = factories.validLoggedUsers()[1]

    await User.remove({})
    await User.insertMany([adminDbUserInfo, loggedInDbUserInfo])

    adminDbUserId = await User.find(adminDbUserInfo)._id
    adminDbUserAccessToken = await AuthService.createToken(adminDbUserId)

    loggedInDbUserId = await User.find(loggedInDbUserInfo)._id
    loggedInDbUserAccessToken = await AuthService.createToken(loggedInDbUserId)
  })

  describe('POST /users', () => {
    it.skip('should create a new user when request is valid', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send(adminRequestUserInfo)
      .expect(httpStatus.CREATED)
      .then(res => {
        expect(res.body).to.include(adminRequestUserInfo)
      }))

    it.skip('should create a new user and set default role to "user"', () => {
      delete adminRequestUserInfo.role
      return request(app)
        .post('/users')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .send(adminRequestUserInfo)
        .expect(httpStatus.CREATED)
        .then(res => {
          expect(res.body.role).to.be.equal('user')
        })
    })

    it.skip('should report conflict error when email already exists', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send(loggedInDbUserInfo)
      .expect(httpStatus.CONFLICT)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.CONFLICT)
        expect(res.body.error.errors).to.be.an('array')
        expect(res.body.error.errors).to.have.length(1)
        const { field, location, messages } = res.body.error.errors[0]
        expect(field).to.be.equal('email')
        expect(location).to.be.equal('body')
        expect(messages).to.include('User already exists.')
      }))

    it.skip('should report bad request error when required parameters are not provided', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
        expect(res.body.error.errors).to.be.an('array')
        expect(res.body.error.errors).to.have.length(4)
        expect(res.body.error.errors).to.include.members([
          { field: 'firstName' },
          { field: 'lastName' },
          { field: 'email' },
          { field: 'password' },
        ])
      }))

    it.skip('should report bad request error when password length is less than 8', () => {
      loggedInRequestUserInfo.password = '1234567'
      return request(app)
        .post('/users')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .send(loggedInRequestUserInfo)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.error.errors[0]
          expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
          expect(res.body.error.errors).to.be.an('array')
          expect(res.body.error.errors).to.have.length(1)
          expect(field).to.be.equal('password')
          expect(location).to.be.equal('body')
          expect(messages).to.include('"password" length must be at least 8 characters long.')
        })
    })

    it.skip('should report bad request error when role is not a valid role', () => {
      loggedInRequestUserInfo.role = 'invalidrole'
      return request(app)
        .post('/users')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .send(loggedInRequestUserInfo)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
          expect(res.body.error.errors).to.be.an('array')
          expect(res.body.error.errors).to.have.length(1)
          expect(res.body.error.errors).to.include({ field: 'role' })
        })
    })

    it.skip('should report unauthorized error when when user is not authenticated', () => request(app)
      .post('/users')
      .send(adminRequestUserInfo)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users can perform this operation.')
      }))

    it.skip('should report forbidden error when authenticated user is not an admin', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
      .send(loggedInRequestUserInfo)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('Only administrators can perform this operation.')
      }))
  })

  describe('GET /users', () => {
    it.skip('should provide a list of all users when request is valid', () => request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.users).to.be.an('array')
        expect(res.body.users).to.have.length(2)
        expect(res.body.users).to.include.members([adminDbUserInfo, loggedInDbUserInfo])
      }))

    it.skip('should get all users with pagination when request is valid', () => request(app)
      .get('/users')
      .query({ page: 2, perPage: 1 })
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.users).to.be.an('array')
        expect(res.body.users).to.have.length(2)
        expect(res.body.users).to.include(loggedInDbUserInfo)
      }))

    it.skip('should filter users using single parameter when request is valid', () => request(app)
      .get('/users')
      .query({ email: loggedInDbUserInfo.email })
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.users).to.be.an('array')
        expect(res.body.users).to.have.length(1)
        expect(res.body.users).to.include(loggedInDbUserInfo)
      }))

    it.skip('should filter users using multiple parameters when request is valid', () => request(app)
      .get('/users')
      .query({ firstName: loggedInDbUserInfo.firstName, role: 'user' })
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.users).to.be.an('array')
        expect(res.body.users).to.have.length(1)
        expect(res.body.users).to.include(loggedInDbUserInfo)
      }))

    it.skip('should return an empty array when single paramter query does not match records', () => request(app)
      .get('/users')
      .query({ email: 'invalidemail' })
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.users).to.be.an('array')
        expect(res.body.users).to.have.length(0)
      }))

    it.skip('should return an empty array when multiple paramter query does not match records', () => request(app)
      .get('/users')
      .query({ email: loggedInDbUserInfo.email, role: 'admin' })
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.users).to.be.an('array')
        expect(res.body.users).to.have.length(0)
      }))

    it.skip('should report bad request error when the pagination\'s parameters are not a number', () => request(app)
      .get('/users')
      .query({ page: '?', perPage: 'whaat' })
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
        expect(res.body.error.errors).to.be.an('array')
        expect(res.body.error.errors).to.have.length(2)
        expect(res.body.error.errors).to.include.members([{ field: 'page' }, { field: 'perPage' }])
      }))

    it.skip('should report bad request error when role is not a valid role', () => request(app)
      .get('/users')
      .query({ role: 'invalidrole' })
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
        expect(res.body.error.errors).to.be.an('array')
        expect(res.body.error.errors).to.have.length(1)
        expect(res.body.error.errors).to.include({ field: 'role' })
      }))

    it.skip('should report unauthorized error when user is not authenticated', () => request(app)
      .get('/users')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users can perform this operation.')
      }))

    it.skip('should report forbidden error when authenticated user is not an admin', () => request(app)
      .get('/users')
      .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('Only administrators can perform this operation.')
      }))
  })

  describe('GET /users/:id', () => {
    it.skip('should provide user information for a user when request is valid', () => request(app)
      .get(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body).to.include(loggedInDbUserInfo)
      }))

    it.skip('should report NotFound error when user does not exist', async () => {
      await User.remove(loggedInDbUserId)
      return request(app)
        .get(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User does not exist.')
        })
    })

    it.skip('should report NotFound error when :id is not a valid ObjectID', () => request(app)
      .get('/users/invalidID')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.NOT_FOUND)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
        expect(res.body.error.message).to.be.equal('User does not exist.')
      }))

    it.skip('should report unauthorized error when user is not authenticated', () => request(app)
      .get(`/users/${loggedInDbUserId}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users can perform this operation.')
      }))

    it.skip('should report forbidden error when authenticated user is not an admin', () => request(app)
      .get(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('Only administrators can perform this operation.')
      }))
  })

  describe('PATCH /users/:id', () => {
    it.skip('should update a user when request is valid', () => {
      const oldInfo = { ...loggedInDbUserInfo }
      loggedInDbUserInfo.firstName = 'newname'
      loggedInDbUserInfo.lastName = 'newlast'
      return request(app)
        .patch(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .send(loggedInDbUserInfo)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.include(loggedInDbUserInfo)
          expect(res.body.firstName).to.not.be.equal(oldInfo.firstName)
          expect(res.body.lastName).to.not.be.equal(oldInfo.lastName)
          expect(res.body.email).to.be.equal(oldInfo.email)
          expect(res.body.role).to.be.equal(oldInfo.role)
        })
    })

    it.skip('should not update user when no parameters were given', () => request(app)
      .patch(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send({})
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body).to.include(loggedInDbUserInfo)
      }))


    it.skip('should report bad request error when role is not a valid role', () => {
      loggedInDbUserInfo.role = 'invalidrole'
      return request(app)
        .patch(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .send(loggedInDbUserInfo)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
          expect(res.body.error.errors).to.be.an('array')
          expect(res.body.error.errors).to.have.length(1)
          expect(res.body.error.errors).to.include({ field: 'role' })
        })
    })

    it.skip('should report NotFound error when user does not exist', async () => {
      await User.remove(loggedInDbUserId)
      return request(app)
        .patch(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User does not exist.')
        })
    })

    it.skip('should report NotFound error when :id is not a valid ObjectID', async () => {
      await User.remove(loggedInDbUserId)
      return request(app)
        .patch('/users/invalidID')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User does not exist.')
        })
    })

    it.skip('should report unauthorized error when user is not authenticated', () => request(app)
      .patch(`/users/${loggedInDbUserId}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users can perform this operation.')
      }))

    it.skip('should report forbidden error when authenticated user is not an admin', () => request(app)
      .patch(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('Only administrators can perform this operation.')
      }))
  })

  describe('DELETE /users/:id', () => {
    it.skip('should delete a user when request is valid', () => request(app)
      .delete(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(async res => {
        const user = await User.findById(loggedInDbUserId)
        expect(user).to.be.undefined()
        expect(res.body).to.include(loggedInDbUserInfo)
      }))

    it.skip('should report NotFound error when user does not exist', async () => {
      await User.remove(loggedInDbUserId)
      return request(app)
        .delete(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User does not exist.')
        })
    })

    it.skip('should report NotFound error when :id is not a valid ObjectID', () => request(app)
      .delete('/users/invalidID')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.NOT_FOUND)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
        expect(res.body.error.message).to.be.equal('User does not exist.')
      }))

    it.skip('should report unauthorized error when user is not authenticated', () => request(app)
      .delete(`/users/${loggedInDbUserId}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users can perform this operation.')
      }))

    it.skip('should report forbidden error when authenticated user is not an admin', () => request(app)
      .delete(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('Only administrators can perform this operation.')
      }))
  })
})

