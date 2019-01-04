const chai = require('chai')
const dirtyChai = require('dirty-chai')
const request = require('supertest')
const httpStatus = require('http-status')
const factories = require('../factories/user.factory')
const User = require('../../source/api/user/user.model')
const app = require('../../source/server/index')

const expect = chai.expect
chai.use(dirtyChai)

let userReqObj
let dbUser

describe('Integration Tests: Auth API', () => {
  beforeEach(async () => {
    dbUser = factories.validLoggedUsers()[0]
    userReqObj = factories.validLoggedUsers()[1]

    await User.remove({})
    await User.create(dbUser)
  })

  describe('POST /register', () => {
    it.skip('should register a new user when request is valid', () => {
      delete userReqObj.role
      return request(app)
        .post('/register')
        .send(userReqObj)
        .expect(httpStatus.CREATED)
        .then(res => {
          expect(res.body.token).to.have.a.property('accessToken')
          expect(res.body.token).to.have.a.property('expiresIn')
          expect(res.body.user).to.include(userReqObj)
        })
    })

    it.skip('should report bad request error when required parameters are not provided', () => request(app)
      .post('/register')
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        expect(res.body.error.errors).to.have.length(4)
        expect(res.body.error.errors[0].field).to.be.equal('firstName')
        expect(res.body.error.errors[1].field).to.be.equal('lastName')
        expect(res.body.error.errors[2].field).to.be.equal('email')
        expect(res.body.error.errors[3].field).to.be.equal('password')
      }))

    it.skip('should report bad request error when email provided is invalid', () => {
      userReqObj.email = 'invalid-email'
      return request(app)
        .post('/register')
        .send(userReqObj)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.error.errors[0]
          expect(res.body.error.errors).to.have.length(1)
          expect(field).to.be.equal('email')
          expect(location).to.be.equal('body')
          expect(messages).to.include('"email" must be a valid email.')
        })
    })

    it.skip('should report conflict error when email already exists', () => request(app)
      .post('/register')
      .send(dbUser)
      .expect(httpStatus.CONFLICT)
      .then(res => {
        const { field, location, messages } = res.body.error.errors[0]
        expect(field).to.be.equal('email')
        expect(location).to.be.equal('body')
        expect(messages).to.include('"email" already exists.')
      }))

    it.skip('should report bad request error when password length is less than 8', () => {
      userReqObj.password = 'short'
      return request(app)
        .post('/register')
        .send(userReqObj)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.error.errors[0]
          expect(field).to.be.equal('password')
          expect(location).to.be.equal('body')
          expect(messages).to.include('"password" must be at least 8 characters long.')
        })
    })
  })

  describe('POST /login', () => {
    it.skip('should return an accessToken when email and password match', () => request(app)
      .post('/login')
      .send(dbUser)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.token).to.have.a.property('accessToken')
        expect(res.body.token).to.have.a.property('expiresIn')
        expect(res.body.user).to.include(dbUser)
      }))

    it.skip('should report bad request error when required parameters are not provided', () => request(app)
      .post('/login')
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        expect(res.body.error.errors).to.have.length(4)
        expect(res.body.error.errors[0].field).to.be.equal('email')
        expect(res.body.error.errors[1].field).to.be.equal('password')
      }))

    it.skip('should report bad request error when email provided is invalid', () => {
      userReqObj.email = 'invalid-email'
      return request(app)
        .post('/login')
        .send(dbUser)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.error.errors[0]
          expect(res.body.error.errors).to.have.length(1)
          expect(field).to.be.equal('email')
          expect(location).to.be.equal('body')
          expect(messages).to.include('"email" must be a valid email.')
        })
    })

    it.skip('should report NotFound error when email does not match any records', () => request(app)
      .post('/login')
      .send(userReqObj)
      .expect(httpStatus.NOT_FOUND)
      .then(res => {
        expect(res.body.error.message).to.be.equal('User email does not match records.')
      }))

    it.skip('should report unauthorized error when email and password do NOT match', () => {
      userReqObj.password = 'invalidpassword'
      return request(app)
        .post('/login')
        .send(dbUser)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.error.message).to.be.equal('Incorrect email and password combination.')
        })
    })
  })
})

