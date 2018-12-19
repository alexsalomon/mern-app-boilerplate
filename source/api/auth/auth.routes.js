'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const routesUtil = require('../../util/routesUtil')
const AuthController = require('./auth.controller')

const router = new express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register', routesUtil.controllerHandler(
  AuthController.register,
  req => [req.body.email, req.body.password],
))

router.post('/login', routesUtil.controllerHandler(
  AuthController.login,
  req => [req.body.email, req.body.password],
))

router.get('/logout', routesUtil.controllerHandler(AuthController.logout))

module.exports = router
