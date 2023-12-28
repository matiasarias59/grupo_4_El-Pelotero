'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImages.belongsTo(models.Product,{
        foreignKey: 'products_id',
        as: 'product',
      });
    }
  }
  ProductImages.init({
    url:{
      allowNull:false,
      type: DataTypes.TEXT,
    }, 
    default:{
      allowNull:false,
      type: DataTypes.BOOLEAN,
    }, 
    products_id:{
      allowNull:false,
      type: DataTypes.INTEGER
    }, 
  }, {
    sequelize,
    modelName: 'ProductImages',
    tableName: 'product_images'
  });
  return ProductImages;
};