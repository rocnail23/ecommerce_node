const { Model } = require("sequelize")
const {Purchase,Cart,ProductCart} = require("../models")



const getPurchases = async (req, res) => {
    try {
        const {id:user_id} = req.user
        const purchases = await Purchase.findAll({where:{user_id},include:ProductCart})   
        return res.status(200).json({purchases})  

    } catch (error) {
        return res.sendStatus(404)
    }

}

const createPurchase = async (req, res) => {
    try {
      const {id:user_id} = req.user
       
      const cart = await Cart.findOne({where:{user_id}})
      const purchase = await Purchase.create({user_id})
       
      const productCart = await cart.getProductCarts()
  
      await purchase.setProductCarts(productCart)

      await cart.removeProductCarts(productCart)

    
      
      res.status(200).json(cart)
    } catch (error) {
        return res.status(400)
    }
}


module.exports = {
    getPurchases,
    createPurchase
}