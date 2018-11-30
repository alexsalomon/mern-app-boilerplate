'use strict'

const HttpStatus = require('http-status')
const ApiError = require('http-errors')
const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.status(200).send('API works.')
})

router.all('*', (req, res, next) => {
  next(new ApiError.NotFound('Resource not found.'))
})

router.use(function handleErrors(err, req, res, next) {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    type: err.type || err.name,
    message: err.message || HttpStatus['500_NAME'],
  })

  next(err)
})

module.exports = router
