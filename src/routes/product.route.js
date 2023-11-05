const express = require('express')
const { getProducts, createProduct, deleteProductById, getProductById, updateProduct, addProductToWishList, deleteProductFromWishList } = require('../controllers/product.controller')
const productRouter = express.Router()
const validateToken = require('../middleware/validateToken')

productRouter.route('/')
  .get(getProducts)
  .post(validateToken, createProduct)

productRouter.route('/:id')
  .put(validateToken, updateProduct)
  .delete(validateToken, deleteProductById)
  .get(getProductById)

productRouter.route('/wishlist/:id')
  .post(validateToken, addProductToWishList)
  .delete(validateToken, deleteProductFromWishList)

module.exports = productRouter
