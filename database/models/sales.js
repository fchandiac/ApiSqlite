'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
  };
  Sales.init({
    amount : DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    dte_code: DataTypes.INTEGER,
    dte_number: DataTypes.INTEGER,
    stock_control: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sales',
    underscored: true,
  });
  return Sales;
};