'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Code.belongsTo(models.User,{
        as: "User",
        foreignKey: "user_id"
      })
    }
  }
  Code.init({
    code: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {model:"Users", key:"id"}

    }
  }, {
    sequelize,
    modelName: 'Code',
  });
  return Code;
};