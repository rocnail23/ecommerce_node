const { Purchase, Cart, ProductCart,Product } = require('../models')

const getPurchases = async (req, res) => {
  try {
    const { id: user_id } = req.user
    const purchases = await Purchase.findAll({ where: { user_id }, include:[
      {model:ProductCart,
       include:Product}
    ]})

    const orderPurchases = []

    for(let purchase of purchases){
      const productCart = {}
      productCart.products = []
      productCart.boughtDate = purchase.createAt
      for(let info of purchase.ProductCarts){
           const product = {quantity: info.quantity, idPurchase: purchase.id}

           productCart.products.push(product)
      }
      orderPurchases.push(productCart)
    }

   return res.status(200).json(orderPurchases)

  } catch (error) {
    return res.sendStatus(404)
  }
}

const createPurchase = async (req, res) => {
  try {
    const { id: user_id } = req.user

    const cart = await Cart.findOne({ where: { user_id } })
    const purchase = await Purchase.create({ user_id })

    const productCart = await cart.getProductCarts()

    await purchase.setProductCarts(productCart)

    await cart.removeProductCarts(productCart)
    const purchases = await Purchase.findAll({ where: { user_id }, include:[
      {model:ProductCart,
       include:Product}
    ]})

    const orderPurchases = []

    for(let purchase of purchases){
      const productCart = {}
      productCart.products = []
      productCart.boughtDate = purchase.createAt
      for(let info of purchase.ProductCarts){
           const product = {quantity: info.quantity, idPurchase: purchase.id}

           productCart.products.push(product)
      }
      orderPurchases.push(productCart)
    }

    res.status(200).json(orderPurchases)
  } catch (error) {
    return res.status(400)
  }
}



module.exports = {
  getPurchases,
  createPurchase
}
