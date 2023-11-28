const { ProductCart, Product, Cart,Image } = require('../models')

const getCart = async (req, res) => {
  try {
    const { id } = req.user
    const cart = await Cart.findOne({ where: { user_id: id } })
    const productCart = await cart.getProductCarts(
      {
        attributes: { exclude: ['createdAt', 'updatedAt', 'product_id', 'id',"purchase_id"] },
        include: [
          {
            model: Product,
            include:Image,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      })
     
    return res.status(200).json(productCart)
  } catch (error) {
    res.status(400).json(error)
  }
}

const addToCart = async (req, res) => {
  try {
    const { id: product_id } = req.params
    const { id: user_id } = req.user

    const cart = await Cart.findOne({ where: user_id })

    const product = Product.findByPk(product_id)
    const InCart = cart.getProductCarts({ where: { product_id } })

    const [Isproduct, isInCart] = await Promise.all([product, InCart])

    if (!Isproduct) return res.sendStatus(404)
    if (isInCart.length > 0) return res.sendStatus(403)

    const bodyProductCart = {
      quantity: 1,
      product_id,
      cart_id: cart.id
    }

    const productCart = await ProductCart.create(bodyProductCart)
    console.log('paaaaaaa')
   

    return res.status(200).json({ mgs: 'product added' })
  } catch (error) {
    return res.status(400)
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { id: product_id } = req.params
    const { id: user_id } = req.user

    const cart = await Cart.findOne({ where: user_id })
    const Productcart = await ProductCart.destroy({where:{product_id, cart_id:cart.id}})
    console.log("heeey")
   
    res.status(200).json({ mgs: 'product deleted' })
  } catch (error) {
    return res.sendStatus(400)
  }
}

const updateCart = async (req, res) => {
  try {
    const { id: product_id } = req.params
    const { id: user_id } = req.user
    const { value } = req.body
    const body = {
      quantity: value
    }

    const { id: cart_id } = await Cart.findOne({ where: user_id })

    const product = await ProductCart.findOne({ where: { product_id, cart_id } })
    if (!product) return res.sendStatus(404)
    const productCart = await product.update(body, { returning: true })

    return res.status(200).json(productCart)
  } catch (error) {
    return res.sendStatus(400)
  }
}

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCart
}
