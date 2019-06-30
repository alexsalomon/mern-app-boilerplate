const request = require('supertest')
const expect = require('chai').expect
const httpStatus = require('http-status')
const factories = require('../../../test/factories/user.factory')
const User = require('../user/user.model')
const app = require('../../server')


describe('Integration Tests: Account API', () => {
  let dbUserInfo
  let dbUserId
  let dbUserAccessToken

  beforeEach(async () => {
    dbUserInfo = factories.validLoggedUsers()[0]

    await User.deleteMany({})
    await User.create(dbUserInfo)
    const dbUser = await User.findOne({ email: dbUserInfo.email })
    dbUserId = dbUser.id
    dbUserAccessToken = await dbUser.createToken()
  })

  describe('GET /account', () => {
    it('should provide the logged user\'s account information when request is valid', () => request(app)
      .get('/account')
      .set('Authorization', `JWT ${dbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.user).to.not.have.a.property('password')
        delete dbUserInfo.password
        expect(res.body.user).to.include(dbUserInfo)
      }))

    it('should report unauthorized error if user is not authenticated', () => request(app)
      .get('/account')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))
  })

  describe('DELETE /account', () => {
    it('should delete the logged user when request is valid', () => request(app)
      .delete('/account')
      .set('Authorization', `JWT ${dbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(async res => {
        const queriedUser = await User.findById(dbUserId)
        expect(queriedUser).to.be.null()

        expect(res.body.user).to.not.have.a.property('password')
        delete dbUserInfo.password
        expect(res.body.user).to.include(dbUserInfo)
      }))

    it('should report unauthorized error if user is not authenticated', () => request(app)
      .delete('/account')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))
  })

  describe('PATCH /account', () => {
    it('should update the logged user when request is valid', () => {
      const updatedUser = { ...dbUserInfo }
      updatedUser.firstName = 'new-first'
      return request(app)
        .patch('/account')
        .set('Authorization', `JWT ${dbUserAccessToken}`)
        .send(updatedUser)
        .expect(httpStatus.OK)
        .then(async res => {
          expect(updatedUser.firstName).to.not.be.equal(dbUserInfo.firstName)
          expect(res.body.user).to.not.have.a.property('password')

          const queriedUser = await User.findById(dbUserId)
          delete updatedUser.password
          expect(queriedUser).to.include(updatedUser)
          expect(res.body.user).to.include(updatedUser)
        })
    })

    it('should not update user when no parameters were given', () => request(app)
      .patch('/account')
      .set('Authorization', `JWT ${dbUserAccessToken}`)
      .send({})
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.user).to.not.have.a.property('password')
        delete dbUserInfo.password
        expect(res.body.user).to.include(dbUserInfo)
      }))

    it('should report bad request error when role is not a valid role', () => {
      dbUserInfo.role = 'invalidrole'
      return request(app)
        .patch('/account')
        .set('Authorization', `JWT ${dbUserAccessToken}`)
        .send(dbUserInfo)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
          expect(res.body.error.errors).to.be.an('array')
          expect(res.body.error.errors).to.have.length(1)
          expect(res.body.error.errors[0].field[0]).to.be.equal('role')
        })
    })

    it('should report unauthorized error if user is not authenticated', () => request(app)
      .patch('/account')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))
  })
})

