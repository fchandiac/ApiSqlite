const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customers extends Model {
    };
    Customers.init({
    
        rut: DataTypes.STRING,
        name: DataTypes.STRING,
        activity: DataTypes.STRING,
        district: DataTypes.INTEGER,
        city: DataTypes.INTEGER,
        address: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Customers',
        underscored: true,
    });
    return Customers;
};