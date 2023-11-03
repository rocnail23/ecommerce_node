'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "user_id"
      })

      Cart.hasMany(models.ProductCart,{
        foreignKey: "cart_id"
      })

     
     
    }
  }
  Cart.init({
    totalMount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {model: "Users", key: "id"}
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};