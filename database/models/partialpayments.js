'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PartialPayments extends Model {
    };
    PartialPayments.init({
        amount: DataTypes.INTEGER,
        detail: DataTypes.JSON,
        user_id: DataTypes.INTEGER,
        customer_id: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'partialpayments',
        underscored: true,
    });
    return PartialPayments;
};