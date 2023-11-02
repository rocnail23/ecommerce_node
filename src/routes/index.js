const express = require('express')
const Router = express.Router()
const userRouter = require('./user.route')
const productRouter = require("./product.route") 

Router.use('/user', userRouter)

Router.use("/product",productRouter)

module.exports = Router
