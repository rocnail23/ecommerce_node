const express = require('express')
const validateToken = require('../middleware/validateToken')
const purchaseRouter = express.Router()
const { getPurchases, createPurchase } = require('../controllers/purchase.controller')

purchaseRouter.route('/')
  .get(validateToken, getPurchases)
  .post(validateToken, createPurchase)

module.exports = purchaseRouter
