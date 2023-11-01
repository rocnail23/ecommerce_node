const { createUser, loginUser, verifyCode, deleteUser, getUser, getCode, renewToken } = require('../controllers/user.controllers')
const express = require('express')
const validateToken = require('../middleware/validateToken')
const userRouter = express.Router()

userRouter.route('/')
  .post(createUser)

userRouter.route('/auth')
  .post(loginUser)

userRouter.route('/verifyCode/:code')
  .get(verifyCode)

userRouter.route('/find/:id')
  .get(getUser)

userRouter.route('/code/:id')
  .get(getCode)

userRouter.route('/validate')
  .get(validateToken, renewToken)

module.exports = userRouter
