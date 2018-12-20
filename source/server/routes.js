const HttpStatus = require('http-status')
const express = require('express')
const APIError = require('../services/errors/api.error')
const AuthRoutes = require('../api/auth/auth.routes')
const UserRoutes = require('../api/user/user.routes')
const StatusRoutes = require('../api/status/status.routes')

const router = new express.Router()

// Render API documentation
router.get('/', (req, res) => {
  res.sendFile('index.html')
})

// API Custom routes
router.use('/', AuthRoutes)
router.use('/', UserRoutes)
router.use('/', StatusRoutes)

// Handles all subsequent routes with a 404 NotFoundError
router.all('*', (req, res, next) => next(new APIError({
  status: HttpStatus.NOT_FOUND,
  message: 'Resource not found.',
})))

module.exports = router
