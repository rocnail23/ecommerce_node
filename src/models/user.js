'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasOne(models.Code, {
        foreignKey: 'user_id'
      })

      User.hasOne(models.WishList, {
        foreignKey: 'user_id'
      })

      User.hasOne(models.Cart, {
        foreignKey: 'user_id'
      })

      User.hasMany(models.Purchase, {
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  })

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.password
    delete values.isValid
    return values
  }

  return User
}
