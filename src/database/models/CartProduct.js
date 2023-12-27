'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartProduct.init({
    products_id:{
      allowNull: false,
      type: DataTypes.INTEGER,
    }, 
    cart_id:{
      allowNull: false,
      type: DataTypes.INTEGER,
    }, 
    quantity:{
      allowNull: false,
      type: DataTypes.INTEGER
    }, 
  }, {
    sequelize,
    modelName: 'CartProduct',
    tableName: 'cart_products',
  });
  return CartProduct;
};