'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      WishList.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      WishList.belongsToMany(models.Product, { through: 'WishListProduct', foreignKey: 'wishListId' })
    }
  }
  WishList.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WishList'
  })

  WishList.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.id

    return values
  }

  return WishList
}
