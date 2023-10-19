'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
  };
  Profiles.init({
    name:  DataTypes.STRING ,
      un_lock: DataTypes.BOOLEAN,
      config: DataTypes.BOOLEAN,
      products: DataTypes.BOOLEAN,
      users: DataTypes.BOOLEAN,
      accounting: DataTypes.BOOLEAN 
  }, {
    sequelize,
    modelName: 'Profiles',
    underscored: true,
  });
  return Profiles;
};