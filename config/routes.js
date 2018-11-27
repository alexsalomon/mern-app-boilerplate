'use strict'

const express = require('express')

const router = new express.Router()

router.get('/api', (req, res) => {
  res.status(200).send('API works.')
})

module.exports = router
