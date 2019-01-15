const request = require('supertest')
const expect = require('chai').expect
const httpStatus = require('http-status')
const app = require('../../server/index')


describe('Integration Tests: Status API', () => {
  describe('GET /status', () => {
    it('should return message OK', () => request(app)
      .get('/status')
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body).to.include({ message: 'OK' })
      }))
  })
})

