const { Product, WishList, Categorie, Image } = require('../models')

const getProducts = async (req, res) => {
  try {
    const {category} = req.query
    const query = {}
    if(category){
      query.attributes = {exclude: ["Categorie","updatedAt","createdAt"]}
      query.include = {model: [Categorie], where: {name:category}}
    }else{
      query.include = {model:Image}
    }
    
    const result = await Product.findAll(query)
    console.log(result[0].Categorie)
    return res.status(200).json({ product: result })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByPk(id,{include:Image})
    if (!product) return res.sendStatus(404)
    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const createProduct = async (req, res) => {
  try {
    const { role } = req.user
    if (role != 'admin') return res.sendStatus(403)
    const productBody = req.body
    console.log(productBody)
    const product = await Product.create(productBody)

    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json({ mgs: error })
  }
}

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.user
    if (role != 'admin') return res.sendStatus(403)
    const deletedProduct = await Product.findByPk(id)
    if (!deletedProduct) return res.sendStatus(404)
    await deletedProduct.destroy()
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(400)
  }
}

const updateProduct = async (req, res) => {
  try {
    const values = req.body
    const { id } = req.params
    const { role } = req.user
    if (role != 'admin') return res.sendStatus(403)
    const product = await Product.update(values, { where: { id }, returning: true })
    return res.status(200).json( product[1][0] )
  } catch (error) {
    return res.status(400).json(error)
  }
}

const addProductToWishList = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { id: productId } = req.params

    const wishList = await WishList.findOne({ where: { user_id: userId } })
    console.log(wishList)
    await wishList.addProduct(productId)

    return res.status(200).json({ mgs: 'product added' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteProductFromWishList = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { id: productId } = req.params
    const wishList = await WishList.findOne({ where: { user_id: userId } })
    const exist = wishList.hasProduct(productId)
    if (!exist) return res.sendStatus(404)
    await wishList.removeProduct(productId)
    return res.status(200).json({ mgs: 'product deleted' })
  } catch (error) {
    res.status(400).json({ mgs: error })
  }
}

module.exports = {
  getProductById,
  getProducts,
  deleteProductById,
  createProduct,
  updateProduct,
  addProductToWishList,
  deleteProductFromWishList
}
