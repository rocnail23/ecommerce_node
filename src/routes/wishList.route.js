const express = require('express')
const validateToken = require('../middleware/validateToken')
const wishListRouter = express.Router()
const {getWishList} = require("../controllers/wishList.controller")


wishListRouter.route("/")
.get(validateToken,getWishList)


module.exports = wishListRouter