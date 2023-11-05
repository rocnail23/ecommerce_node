'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Product.hasMany(models.Image, {
        foreignKey: 'images'
      })
      Product.hasMany(models.ProductCart, {
        foreignKey: 'product_id'
      })
      Product.belongsToMany(models.WishList, 
        { through: 'WishListProduct', foreignKey: 'productId' })
      Product.belongsTo(models.Categorie,{
        foreignKey:"category_id"
      })  
    }
  }
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    category_id:{
      type: DataTypes.INTEGER,
      references: {Model:"Categories", key:"id"}
    }
  }, {
    sequelize,
    modelName: 'Product'
  })

  Product.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.WishListProduct
    delete values.Categorie
    return values
  }
  return Product
}
