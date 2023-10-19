'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrdersDetails extends Model {
  };
  OrdersDetails.init({
    order_id : DataTypes.INTEGER,
    product_id : DataTypes.INTEGER,
    quanty: DataTypes.FLOAT,
    sale: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    name: DataTypes.STRING,
    affected: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'ordersdetails',
    underscored: true,
  });
  return OrdersDetails;
};