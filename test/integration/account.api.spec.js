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

let dbUser
let dbUserId
let dbUserAccessToken

describe('Integration Tests: Account API', () => {
  beforeEach(async () => {
    dbUser = factories.validLoggedUsers()[0]

    await User.remove({})
    await User.create(dbUser)
    dbUserId = await User.find(dbUser)._id
    dbUserAccessToken = await AuthService.createToken(dbUserId)
  })

  describe('GET /account', () => {
    it.skip('should provide the logged user\'s information when request is valid', () => request(app)
      .get('/account')
      .set('Authorization', `Bearer ${dbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.user).to.include(dbUser)
      }))

    it.skip('should report unauthorized error if user is not authenticated', () => request(app)
      .get('/account')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))
  })

  describe('DELETE /account', () => {
    it.skip('should delete the logged user when request is valid', () => request(app)
      .delete('/account')
      .set('Authorization', `Bearer ${dbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(async res => {
        const queriedUser = await User.findById(dbUserId)
        expect(queriedUser).to.be.undefined()
        expect(res.body.user).to.include(dbUser)
      }))

    it.skip('should report unauthorized error if user is not authenticated', () => request(app)
      .delete('/account')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))
  })

  describe('PATCH /account', () => {
    it.skip('should update the logged user when request is valid', () => {
      const updatedUser = { ...dbUser }
      updatedUser.firstName = 'new-first'
      return request(app)
        .patch('/account')
        .set('Authorization', `Bearer ${dbUserAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.OK)
        .then(async res => {
          const queriedUser = await User.findById(dbUserId)
          expect(queriedUser.firstName).to.not.be.equal(dbUser.firstName)
          expect(queriedUser).to.include(updatedUser)
          expect(res.body.user).to.include(updatedUser)
          expect(res.body.user.firstName).to.not.be.equal(dbUser.firstName)
        })
    })

    it.skip('should not update user when no parameters were given', () => request(app)
      .patch('/account')
      .set('Authorization', `Bearer ${dbUserAccessToken}`)
      .send({})
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.user).to.include(dbUser)
      }))

    it.skip('should report unauthorized error if user is not authenticated', () => request(app)
      .patch('/account')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))
  })
})

