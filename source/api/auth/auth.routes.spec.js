const request = require('supertest')
const expect = require('chai').expect
const httpStatus = require('http-status')
const factories = require('../../../test/factories/user.factory')
const User = require('../user/user.model')
const app = require('../../server')

let dbUserInfo
let userInfo

describe('Integration Tests: Auth API', () => {
  beforeEach(async () => {
    dbUserInfo = factories.validLoggedUsers()[0]
    userInfo = factories.validLoggedUsers()[1]

    await User.deleteMany({})
    await User.create(dbUserInfo)
  })

  describe('POST /signup', () => {
    it('should register a new user when request is valid', () => request(app)
      .post('/signup')
      .send(userInfo)
      .expect(httpStatus.CREATED)
      .then(res => {
        expect(res.body.token).to.have.a.property('tokenType')
        expect(res.body.token).to.have.a.property('accessToken')
        expect(res.body.token).to.have.a.property('expiresIn')
        expect(res.body.user).to.not.have.a.property('password')
        delete userInfo.password
        expect(res.body.user).to.include(userInfo)
      }))

    it('should register a new user ignoring the presence of a role parameter', () => {
      userInfo.role = 'admin'
      return request(app)
        .post('/signup')
        .send(userInfo)
        .expect(httpStatus.CREATED)
        .then(res => {
          expect(res.body.user.role).to.not.be.equal('admin')
        })
    })

    it('should report bad request error when required parameters are not provided', () => request(app)
      .post('/signup')
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        expect(res.body.error.errors).to.have.length(4)
        expect(res.body.error.errors[0].field[0]).to.be.equal('firstName')
        expect(res.body.error.errors[1].field[0]).to.be.equal('lastName')
        expect(res.body.error.errors[2].field[0]).to.be.equal('email')
        expect(res.body.error.errors[3].field[0]).to.be.equal('password')
      }))

    it('should report bad request error when email provided is invalid', () => {
      userInfo.email = 'invalid-email'
      return request(app)
        .post('/signup')
        .send(userInfo)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.error.errors[0]
          expect(res.body.error.errors).to.have.length(1)
          expect(field[0]).to.be.equal('email')
          expect(location).to.be.equal('body')
          expect(messages[0]).to.include('"email" must be a valid email')
        })
    })

    it('should report conflict error when email already exists', () => request(app)
      .post('/signup')
      .send(dbUserInfo)
      .expect(httpStatus.CONFLICT)
      .then(res => {
        const { field, location, messages } = res.body.error.errors[0]
        expect(field[0]).to.be.equal('email')
        expect(location).to.be.equal('body')
        expect(messages[0]).to.include('User already exists.')
      }))

    it('should report bad request error when password length is less than 8', () => {
      userInfo.password = 'short'
      return request(app)
        .post('/signup')
        .send(userInfo)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.error.errors[0]
          expect(field[0]).to.be.equal('password')
          expect(location).to.be.equal('body')
          expect(messages[0]).to.include('"password" length must be at least 8 characters long')
        })
    })
  })

  describe('POST /login', () => {
    it('should return an accessToken when email and password match', () => request(app)
      .post('/login')
      .send(dbUserInfo)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.token).to.have.a.property('tokenType')
        expect(res.body.token).to.have.a.property('accessToken')
        expect(res.body.token).to.have.a.property('expiresIn')
        expect(res.body.user).to.not.have.a.property('password')
        delete dbUserInfo.password
        expect(res.body.user).to.include(dbUserInfo)
      }))

    it('should report bad request error when required parameters are not provided', () => request(app)
      .post('/login')
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        expect(res.body.error.errors).to.have.length(2)
        expect(res.body.error.errors[0].field[0]).to.be.equal('email')
        expect(res.body.error.errors[1].field[0]).to.be.equal('password')
      }))

    it('should report bad request error when email provided is invalid', () => {
      dbUserInfo.email = 'invalid-email'
      return request(app)
        .post('/login')
        .send(dbUserInfo)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field, location, messages } = res.body.error.errors[0]
          expect(res.body.error.errors).to.have.length(1)
          expect(field[0]).to.be.equal('email')
          expect(location).to.be.equal('body')
          expect(messages[0]).to.include('"email" must be a valid email')
        })
    })

    it('should report NotFound error when email does not match any records', () => request(app)
      .post('/login')
      .send(userInfo)
      .expect(httpStatus.NOT_FOUND)
      .then(res => {
        expect(res.body.error.message).to.be.equal('User email does not match records.')
      }))

    it('should report unauthorized error when email and password do NOT match', () => {
      dbUserInfo.password = 'invalidpassword'
      return request(app)
        .post('/login')
        .send(dbUserInfo)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.error.message).to.be.equal('Incorrect email and password combination.')
        })
    })
  })
})

