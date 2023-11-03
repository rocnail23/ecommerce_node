const { Model } = require("sequelize")
const {WishList,Product} = require("../models")

const  getWishList = async(req,res) => {
    try {
        const {id} = req.user
        const cart  = await WishList.findOne({where:{user_id:id}})    
        const up = await  cart.getProducts({attributes:{exclude:["WishListProduct", "createdAt","updatedAt"]}})
        return res.status(200).json(up)
    } catch (error) {
        return res.status(400)
    }
}


module.exports = {
    getWishList
}