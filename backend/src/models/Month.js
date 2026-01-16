const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Month = sequelize.define(
    'Month', {
        id: {
             type: DataTypes.INTEGER, 
             autoIncrement: true, 
             primaryKey: true 
        },

        label: {
             type: DataTypes.STRING(20), 
             allowNull: false, 
             unique: true 
        },
        start_date: { 
            type: DataTypes.DATEONLY, 
            allowNull: false 
        },

        end_date: {
             type: DataTypes.DATEONLY, 
             allowNull: false 
        },

        publish_date: {
             type: DataTypes.DATEONLY, 
             allowNull: false 
        },

        status: {
            type: DataTypes.ENUM("open", "closed", "published"),
            allowNull: false,
            defaultValue: "open",
        },
    },

    {
    tableName: "months",
    timestamps: false,
    }
);

module.exports = Month;