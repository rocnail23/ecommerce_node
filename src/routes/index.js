const express = require('express')
const Router = express.Router()
const userRouter = require('./user.route')
const productRouter = require('./product.route')
const wishListRouter = require('./wishList.route')
const cartRouter = require('./cart.route')
const purchaseRouter = require('./purchases.route')
const categoryRouter = require("./category.route")
const imageRouter = require("./image.route")
const paypalRouter = require("./paypal.route")
const googleRouter = require("./google.route")

Router.use('/user', userRouter)

Router.use('/product', productRouter)

Router.use('/wishlist', wishListRouter)

Router.use('/cart', cartRouter)

Router.use('/purchase', purchaseRouter)

Router.use("/category",categoryRouter)

Router.use("/image", imageRouter)

Router.use("/orders",paypalRouter)

Router.use("/login/google", googleRouter)


module.exports = Router
