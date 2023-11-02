const { createUser, loginUser, verifyCode, updateUser, getUser, getCode, renewToken } = require('../controllers/user.controller')
const express = require('express')
const validateToken = require('../middleware/validateToken')
const userRouter = express.Router()

userRouter.route('/')
  .post(createUser)

userRouter.route('/auth')
  .post(loginUser)

userRouter.route('/verifyCode/:code')
  .get(verifyCode)


userRouter.route('/code/:id')
  .get(getCode)

userRouter.route('/validate')
  .get(validateToken, renewToken)

  userRouter.route('/:id')
  .get(getUser)
  .put(updateUser)

module.exports = userRouter
