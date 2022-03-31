'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Urlshort extends Model {};

    Urlshort.init({
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        original_url: DataTypes.TEXT,
        shortened_url: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Urlshort',
        tableName: 'Urlshort',
        timestamps: true,
    });



    return Urlshort;
};
