const express = require('express')
const validateToken = require('../middleware/validateToken')
const cartRouter = express.Router()
const {addToCart, getCart,removeFromCart, updateCart} = require("../controllers/cart.controller")




cartRouter.route("/")
.get(validateToken,getCart)

cartRouter.route("/:id")
.post(validateToken,addToCart)
.delete(validateToken,removeFromCart)
.put(validateToken,updateCart)



module.exports = cartRouter