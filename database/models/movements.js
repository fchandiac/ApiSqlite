
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movements extends Model {
  };
  Movements.init({
    amount:  DataTypes.INTEGER,
      movement_type: DataTypes.INTEGER,
      paymentMethod: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      cash_resgiter_state: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Movements',
    underscored: true,
  });
  return Movements;
};

