'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Products,{
        foreignKey: 'brands_id',
        as:'products',
      })
    }
  }
  Brand.init({
    name:{
      allowNull:false,
      type: DataTypes.STRING(128)
    }, 
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands'
  });
  return Brand;
};