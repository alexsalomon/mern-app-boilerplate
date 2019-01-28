const request = require('supertest')
const expect = require('chai').expect
const httpStatus = require('http-status')
const factories = require('../../../test/factories/user.factory')
const app = require('../../server/index')
const User = require('./user.model')

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

    await User.deleteMany({})
    await User.insertMany([adminDbUserInfo, loggedInDbUserInfo])

    const adminDbUser = await User.findOne({ email: adminDbUserInfo.email })
    adminDbUserId = adminDbUser.id
    adminDbUserAccessToken = await adminDbUser.createToken()

    const loggedInDbUser = await User.findOne({ email: loggedInDbUserInfo.email })
    loggedInDbUserId = loggedInDbUser.id
    loggedInDbUserAccessToken = await loggedInDbUser.createToken()
  })

  describe('POST /users', () => {
    it('should create a new user when request is valid', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send(adminRequestUserInfo)
      .expect(httpStatus.CREATED)
      .then(res => {
        expect(res.body.user).to.not.have.a.property('password')
        delete adminRequestUserInfo.password
        expect(res.body.user).to.include(adminRequestUserInfo)
      }))

    it('should create a new user and set default role to "user"', () => {
      delete adminRequestUserInfo.role
      return request(app)
        .post('/users')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .send(adminRequestUserInfo)
        .expect(httpStatus.CREATED)
        .then(res => {
          expect(res.body.user.role).to.be.equal('user')
        })
    })

    it('should report conflict error when email already exists', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send(loggedInDbUserInfo)
      .expect(httpStatus.CONFLICT)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.CONFLICT)
        expect(res.body.error.errors).to.be.an('array')
        expect(res.body.error.errors).to.have.length(1)
        expect(res.body.error.errors[0].field[0]).to.be.equal('email')
        expect(res.body.error.errors[0].location).to.be.equal('body')
        expect(res.body.error.errors[0].messages[0]).to.be.equal('User already exists.')
      }))

    it('should report bad request error when required parameters are not provided', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send({})
      .expect(httpStatus.BAD_REQUEST)
      .then(res => {
        const requiredFields = ['firstName', 'lastName', 'email', 'password']
        expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
        expect(res.body.error.errors).to.be.an('array')
        expect(res.body.error.errors).to.have.length(4)
        res.body.error.errors.forEach(error => {
          expect(requiredFields).to.include(error.field[0])
        })
      }))

    it('should report bad request error when password length is less than 8', () => {
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
          expect(field[0]).to.be.equal('password')
          expect(location).to.be.equal('body')
          expect(messages).to.include('"password" length must be at least 8 characters long')
        })
    })

    it('should report bad request error when role is not a valid role', () => {
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
          expect(res.body.error.errors[0].field[0]).to.be.equal('role')
        })
    })

    it('should report unauthorized error when when user is not authenticated', () => request(app)
      .post('/users')
      .send(adminRequestUserInfo)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))

    it('should report forbidden error when authenticated user is not an admin', () => request(app)
      .post('/users')
      .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
      .send(loggedInRequestUserInfo)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('You do not have permission to access this resource.')
      }))
  })

  describe('GET /users', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      await User.insertMany([...factories.validAdminUsers(), ...factories.validLoggedUsers()])

      const adminDbUser = await User.findOne({ role: 'admin' })
      adminDbUserId = adminDbUser.id
      adminDbUserAccessToken = await adminDbUser.createToken()

      const loggedInDbUser = await User.findOne({ role: 'user' })
      loggedInDbUserId = loggedInDbUser.id
      loggedInDbUserAccessToken = await loggedInDbUser.createToken()
    })

    describe('GET /users - pagination', () => {
      it('should return page one of a list of users limited to the default per page value when no pagination options are provided', () => request(app)
        .get('/users')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(13)
          expect(res.body.page).to.be.equal(1)
          expect(res.body.perPage).to.be.equal(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(10)

          for (const user of res.body.users) {
            expect(user).to.not.have.a.property('password')
          }
        }))

      it('should return page one of a list of users limited to one user per page', () => request(app)
        .get('/users')
        .query({ page: 1, perPage: 1 })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(13)
          expect(res.body.page).to.be.equal(1)
          expect(res.body.perPage).to.be.equal(1)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(1)
        }))

      it('should return page one of a list of users limited to two users per page', () => request(app)
        .get('/users')
        .query({ page: 1, perPage: 2 })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(13)
          expect(res.body.page).to.be.equal(1)
          expect(res.body.perPage).to.be.equal(2)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(2)
        }))

      it('should return page three of a list of users limited to one user per page', () => request(app)
        .get('/users')
        .query({ page: 3, perPage: 2 })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(13)
          expect(res.body.page).to.be.equal(3)
          expect(res.body.perPage).to.be.equal(2)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(2)
        }))

      it('should return an empty array when requesting an out-of-bounds page number', () => request(app)
        .get('/users')
        .query({ page: 10, perPage: 10 })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(13)
          expect(res.body.page).to.be.equal(10)
          expect(res.body.perPage).to.be.equal(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(0)
        }))

      it('should report bad request error when pagination parameters are invalid: NaN', () => request(app)
        .get('/users')
        .query({ page: 'one', perPage: true })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
          expect(res.body.error.errors).to.be.an('array')
          expect(res.body.error.errors).to.have.length(2)
          for (const error of res.body.error.errors) {
            expect(['page', 'perPage']).to.include(error.field[0])
          }
        }))
    })

    describe('GET /users - sorting', () => {
      it('should return a list of all users sorted using the default configuration when no sorting options are provided', () => request(app)
        .get('/users')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.users).to.have.length(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.be.ascendingBy('role')
          expect(res.body.users).to.be.ascendingBy('email')
        }))

      it('should return a list of all users sorted in descending order from email', () => request(app)
        .get('/users')
        .query({ sortOn: '-email' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.users).to.have.length(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.be.descendingBy('email')
        }))

      it('should return a list of all users sorted in ascending order from firstname', () => request(app)
        .get('/users')
        .query({ sortOn: 'firstName' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.users).to.have.length(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.be.ascendingBy('firstName')
        }))

      it('should not sort results when sorting field is invalid', () => request(app)
        .get('/users')
        .query({ sortOn: 'invalid' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.users).to.have.length(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.not.be.sortedBy('email')
        }))
    })

    describe('GET /users - filtering', () => {
      it('should return a list of all users when valid requests have no filters', () => request(app)
        .get('/users')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(13)
          expect(res.body.page).to.be.equal(1)
          expect(res.body.perPage).to.be.equal(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(10)
        }))

      it('should return a list of all admin users when valid requests have a role:admin filter', () => request(app)
        .get('/users')
        .query({ role: 'admin' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(3)
          expect(res.body.page).to.be.equal(1)
          expect(res.body.perPage).to.be.equal(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(3)

          for (const user of res.body.users) {
            expect(user.role).to.be.equal('admin')
          }
        }))

      it('should return a list of all admin users with firstname "Nala" when valid requests have role:admin and firstName:Nala filters', () => request(app)
        .get('/users')
        .query({ role: 'admin', firstName: 'Nala' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(1)
          expect(res.body.page).to.be.equal(1)
          expect(res.body.perPage).to.be.equal(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(1)
          expect(res.body.users[0].role).to.be.equal('admin')
          expect(res.body.users[0].firstName).to.be.equal('Nala')
        }))

      it('should report bad request error when using the role filter with an invalid role', () => request(app)
        .get('/users')
        .query({ role: 'invalid' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.BAD_REQUEST)
          expect(res.body.error.errors).to.be.an('array')
          expect(res.body.error.errors).to.have.length(1)
          expect(res.body.error.errors[0].field[0]).to.be.equal('role')
        }))

      it('should ignore invalid filters', () => request(app)
        .get('/users')
        .query({ invalid: 'invalid', lastName: 'Last4' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(1)
          expect(res.body.page).to.be.equal(1)
          expect(res.body.perPage).to.be.equal(10)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(1)
          expect(res.body.users[0].lastName).to.be.equal('Last4')
        }))

      it('should return no results when filter value does not match] the database', () => request(app)
        .get('/users')
        .query({ email: 'notfound@email.com' })
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.count).to.be.equal(0)
          expect(res.body.users).to.be.an('array')
          expect(res.body.users).to.have.length(0)
        }))
    })

    describe('GET /users - auth', () => {
      it('should report unauthorized error when user is not authenticated', () => request(app)
        .get('/users')
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
          expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
        }))

      it('should report forbidden error when authenticated user is not an admin', () => request(app)
        .get('/users')
        .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
        .expect(httpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
          expect(res.body.error.message).to.be.equal('You do not have permission to access this resource.')
        }))
    })
  })

  describe('GET /users/:id', () => {
    it('should provide user information for a user when request is valid', () => request(app)
      .get(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.user).to.not.have.a.property('password')
        delete loggedInDbUserInfo.password
        expect(res.body.user).to.include(loggedInDbUserInfo)
      }))

    it('should report NotFound error when user does not exist', async () => {
      await User.deleteOne({ _id: loggedInDbUserId })
      return request(app)
        .get(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User not found.')
        })
    })

    it('should report NotFound error when :id is not a valid ObjectID', () => request(app)
      .get('/users/invalidID')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.NOT_FOUND)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
        expect(res.body.error.message).to.be.equal('User not found.')
      }))

    it('should report unauthorized error when user is not authenticated', () => request(app)
      .get(`/users/${loggedInDbUserId}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))

    it('should report forbidden error when authenticated user is not an admin', () => request(app)
      .get(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('You do not have permission to access this resource.')
      }))
  })

  describe('PATCH /users/:id', () => {
    it('should update a user when request is valid', () => {
      const oldInfo = { ...loggedInDbUserInfo }
      loggedInDbUserInfo.firstName = 'newname'
      loggedInDbUserInfo.lastName = 'newlast'
      return request(app)
        .patch(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .send(loggedInDbUserInfo)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.user).to.not.have.a.property('password')
          delete loggedInDbUserInfo.password
          expect(res.body.user).to.include(loggedInDbUserInfo)
          expect(res.body.user.firstName).to.not.be.equal(oldInfo.firstName)
          expect(res.body.user.lastName).to.not.be.equal(oldInfo.lastName)
          expect(res.body.user.email).to.be.equal(oldInfo.email)
          expect(res.body.user.role).to.be.equal(oldInfo.role)
        })
    })

    it('should not update user when no parameters were given', () => request(app)
      .patch(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .send({})
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body.user).to.not.have.a.property('password')
        delete loggedInDbUserInfo.password
        expect(res.body.user).to.include(loggedInDbUserInfo)
      }))


    it('should report bad request error when role is not a valid role', () => {
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
          expect(res.body.error.errors[0].field[0]).to.be.equal('role')
        })
    })

    it('should report NotFound error when user does not exist', async () => {
      await User.deleteOne({ _id: loggedInDbUserId })
      return request(app)
        .patch(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User not found.')
        })
    })

    it('should report NotFound error when :id is not a valid ObjectID', async () => {
      await User.deleteOne({ _id: loggedInDbUserId })
      return request(app)
        .patch('/users/invalidID')
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User not found.')
        })
    })

    it('should report unauthorized error when user is not authenticated', () => request(app)
      .patch(`/users/${loggedInDbUserId}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))

    it('should report forbidden error when authenticated user is not an admin', () => request(app)
      .patch(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('You do not have permission to access this resource.')
      }))
  })

  describe('DELETE /users/:id', () => {
    it('should delete a user when request is valid', () => request(app)
      .delete(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.OK)
      .then(async res => {
        const user = await User.findById(loggedInDbUserId)
        expect(user).to.be.null()

        expect(res.body.user).to.not.have.a.property('password')
        delete loggedInDbUserInfo.password
        expect(res.body.user).to.include(loggedInDbUserInfo)
      }))

    it('should report NotFound error when user does not exist', async () => {
      await User.deleteOne({ _id: loggedInDbUserId })
      return request(app)
        .delete(`/users/${loggedInDbUserId}`)
        .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
          expect(res.body.error.message).to.be.equal('User not found.')
        })
    })

    it('should report NotFound error when :id is not a valid ObjectID', () => request(app)
      .delete('/users/invalidID')
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.NOT_FOUND)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.NOT_FOUND)
        expect(res.body.error.message).to.be.equal('User not found.')
      }))

    it.skip('should report conflict error when trying to delete the same user who is sending the request', () => request(app)
      .delete(`/users/${adminDbUserId}`)
      .set('Authorization', `Bearer ${adminDbUserAccessToken}`)
      .expect(httpStatus.CONFLICT)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.CONFLICT)
        expect(res.body.error.message).to.be.equal('In order to delete your own account, use /account/terminate.')
      }))

    it('should report unauthorized error when user is not authenticated', () => request(app)
      .delete(`/users/${loggedInDbUserId}`)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.UNAUTHORIZED)
        expect(res.body.error.message).to.be.equal('Only authenticated users have access to this resource.')
      }))

    it('should report forbidden error when authenticated user is not an admin', () => request(app)
      .delete(`/users/${loggedInDbUserId}`)
      .set('Authorization', `Bearer ${loggedInDbUserAccessToken}`)
      .expect(httpStatus.FORBIDDEN)
      .then(res => {
        expect(res.body.error.status).to.be.equal(httpStatus.FORBIDDEN)
        expect(res.body.error.message).to.be.equal('You do not have permission to access this resource.')
      }))
  })
})

