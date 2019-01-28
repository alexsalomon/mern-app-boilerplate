const HttpStatus = require('http-status')
const express = require('express')
const { APIError } = require('../util/errors')
const AuthRoutes = require('../api/auth/auth.routes')
const AccountRoutes = require('../api/account/account.routes')
const UserRoutes = require('../api/user/user.routes')
const StatusRoutes = require('../api/status/status.routes')

const router = new express.Router()

// Render API documentation
router.get('/', (req, res) => {
  res.sendFile('index.html')
})

// API Custom routes
router.use('/', AuthRoutes)
router.use('/account', AccountRoutes)
router.use('/users', UserRoutes)
router.use('/status', StatusRoutes)

// Handles all subsequent routes with a 404 NotFoundError
router.all('*', (req, res, next) => next(new APIError({
  status: HttpStatus.NOT_FOUND,
  message: 'Resource not found.',
})))

module.exports = router
