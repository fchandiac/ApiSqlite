
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
  };
  Stocks.init({
    product_id : DataTypes.INTEGER,
    storage_id : DataTypes.INTEGER,
    stock : DataTypes.INTEGER,
    critical_stock : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stocks',
    underscored: true,
  });
  return Stocks;
};


