const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const OfficialLineup = sequelize.define(
    'OfficialLineup', {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },

        month_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            unique: true 
        },

        method: {
            type: DataTypes.ENUM("manual", "auto"),
            allowNull: false,
            defaultValue: "manual",
        },
    },

    {
        tableName: "official_lineups",
        timestamps: false,
    }
);

module.exports = OfficialLineup;


