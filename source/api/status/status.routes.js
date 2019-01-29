const express = require('express')


const router = new express.Router()

/**
 * {GET} /status
 */
router.get('/', (req, res) => res.json({ message: 'OK' }))


module.exports = router
