'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Pays extends Model {
    };
    Pays.init({
        sale_id: DataTypes.INTEGER,
        customer_id: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        payment_method: DataTypes.STRING,
        state: DataTypes.BOOLEAN,
        paid: DataTypes.INTEGER,
        balance: DataTypes.INTEGER,
        date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Pays',
        underscored: true,
    });
    return Pays;
};