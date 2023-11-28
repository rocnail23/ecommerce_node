'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Image.belongsTo(models.Product, {
        foreignKey: 'images'
      })
    }
  }
  Image.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    images: {
      type: DataTypes.INTEGER,
      references: { model: 'Products', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Image'
  })
  return Image
}
