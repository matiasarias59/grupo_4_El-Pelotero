'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol,{
        foreignKey: 'roles_id',
        as: 'rol',
      });
      User.hasMany(models.Cart, {
        foreignKey: 'user_id',
        as: 'cart',
      });
      User.belongsToMany(models.Product,{
        foreignKey: 'products_id',
        otherKey: 'users_id',
        through: 'products_likes',
        as: 'products_liked',
      });
    }
  }
  User.init({
    first_name:{
      allowNull:false,
      type: DataTypes.STRING,
    }, 
    last_name:{
      allowNull:false,
      type: DataTypes.STRING,
    }, 
    email:{
      allowNull:false,
      unique: true,
      type: DataTypes.STRING,
    }, 
    password:{
      allowNull:false,
      type: DataTypes.TEXT,
    }, 
    avatar:{
      allowNull:false,
      type: DataTypes.TEXT,
    }, 
    birth_date:{
      allowNull:false,
      type: DataTypes.DATE,
    }, 
    roles_id:{
      allowNull:false,
      type: DataTypes.INTEGER
    }, 
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};