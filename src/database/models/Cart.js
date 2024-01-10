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
      Cart.belongsTo(models.User,{
        foreignKey:'users_id',
        as: 'user',
      });
      Cart.belongsToMany(models.Product,{
        foreignKey: 'products_id',
        otherKey: 'carts_id',
        through: 'cart_products',
        as: 'products'
      });
    }
  }
  Cart.init({
    users_id:{
      allowNull: false,
      type: DataTypes.INTEGER,
    }, 
    total:{
      allowNull: false,
      type: DataTypes.DECIMAL,
    }, 
    due_date:{
      allowNull: false,
      type: DataTypes.DATE,
    },
    purchase_at:{
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName:'carts'
  });
  return Cart;
};