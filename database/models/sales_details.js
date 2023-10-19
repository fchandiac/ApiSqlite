'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class SalesDetails extends Model {
  };
  SalesDetails.init({
    sale_id : DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quanty: DataTypes.FLOAT,
    sale: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'salesdetails',
    underscored: true,
  });
  return SalesDetails;
};
