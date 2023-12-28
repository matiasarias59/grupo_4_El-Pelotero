'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductLike.init({
    products_id:{
      allowNull: false,
      type: DataTypes.INTEGER,
    }, 
    users_id:{
      allowNull: false,
      type: DataTypes.INTEGER
    }, 
  }, {
    sequelize,
    modelName: 'ProductLike',
    tableName: 'products_likes',
  });
  return ProductLike;
};