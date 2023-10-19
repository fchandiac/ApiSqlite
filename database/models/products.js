'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
  };
  Products.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    category_id : DataTypes.INTEGER,
    tax_id : DataTypes.INTEGER,
    favorite: DataTypes.BOOLEAN,
    stock_control: DataTypes.BOOLEAN,
    sale: DataTypes.INTEGER,
    purchase: DataTypes.INTEGER,
    affected: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Products',
    underscored: true,
  });
  return Products;
};