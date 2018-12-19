const HttpStatus = require('http-status')
const ApiError = require('http-errors')
const express = require('express')
const AuthRoutes = require('../api/auth/auth.routes')
const UserRoutes = require('../api/user/user.routes')
const logger = require('../services/logger')

const router = new express.Router()

router.use('/', AuthRoutes)
router.use('/users', UserRoutes)

router.all('*', (req, res, next) => {
  next(new ApiError.NotFound('Resource not found.'))
})

router.use(function logErrors(err, req, res, next) {
  logger.error(err)
  next(err)
})

router.use(function handleErrors(err, req, res, next) {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    type: err.type || err.name,
    message: err.message || HttpStatus['500_NAME'],
  })

  next(err)
})

module.exports = router
