const { createUser,loginUser,verifyCode } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
.post(createUser)

userRouter.route("/auth")
.post(loginUser)

userRouter.router("/verifyCode/:code")
.get(verifyCode)

module.exports = userRouter

