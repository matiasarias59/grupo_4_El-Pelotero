'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand, {
        foreignKey: 'brands_id',
        as: 'brand',
      });
      Product.belongsTo(models.Category,{
        foreignKey: 'categories_id',
        as: 'category',
      })
      Product.hasMany(models.ProductImages,{
        foreignKey: 'products_id',
        as: 'images',
      });
      Product.belongsToMany(models.User,{
        foreignKey: 'users_id',
        otherKey: 'products_id',
        through: 'products_likes',
        as: 'users_liked',
      });
      Product.belongsToMany(models.Cart,{
        foreignKey: 'carts_id',
        otherKey: 'products_id',
        through: 'cart_products',
        as: 'carts'
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      description: DataTypes.TEXT,
      brands_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
    }
  );
  return Product;
};
