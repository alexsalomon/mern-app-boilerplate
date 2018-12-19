'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const routesUtil = require('../../util/routesUtil')
const AuthServices = require('../auth/auth.services')
const UserController = require('./user.controller')

const router = new express.Router()
router.use(bodyParser.urlencoded({ extended: true }))

// Authorization middleware
const verifyToken = AuthServices.verifyToken

// getAllUsers
router.get('/', verifyToken, routesUtil.controllerHandler(UserController.getAllUsers))

// getUser
router.get('/:id', verifyToken, routesUtil.controllerHandler(
  UserController.getUser,
  req => [req.params.id],
))

// deleteUser
router.delete('/:id', verifyToken, routesUtil.controllerHandler(
  UserController.deleteUser,
  req => [req.params.id],
))

// updateUser
router.put('/:id', verifyToken, routesUtil.controllerHandler(
  UserController.updateUser,
  req => [req.params.id, req.body],
))

module.exports = router
