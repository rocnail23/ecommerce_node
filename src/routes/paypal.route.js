const express = require('express')
const validateToken = require('../middleware/validateToken')
const paypalRouter = express.Router()
const {captureTheOrder, newOrder} = require("../controllers/paypal.controller")


paypalRouter.route("/")
.post(newOrder)

paypalRouter.route("/:orderID/capture")
.post(captureTheOrder)

module.exports = paypalRouter