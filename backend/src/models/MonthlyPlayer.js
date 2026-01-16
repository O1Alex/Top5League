const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const MonthlyPlayer = sequelize.define(
    'MonthlyPlayer', {
        id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },

        month_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },

        fullname: { 
            type: DataTypes.STRING(100), 
            allowNull: false 
        },

        position: {
            type: DataTypes.ENUM("PG", "SG", "SF", "PF", "C"),
            allowNull: false,
        },

        team_name: { 
            type: DataTypes.STRING(100), 
            allowNull: true },

        pts: { 
            type: DataTypes.DECIMAL(5, 2), 
            allowNull: false, 
            defaultValue: 0.0 
        },

        ast: { 
            type: DataTypes.DECIMAL(5, 2), 
            allowNull: false, defaultValue: 0.0 
        },

        reb: { 
            type: DataTypes.DECIMAL(5, 2), 
            allowNull: false, 
            defaultValue: 0.0 
        },

        photo_url: 
        { type: DataTypes.STRING(255), 
            allowNull: true 
        },
    },

    {
        tableName: "monthly_players",
        timestamps: false,
    }
);


module.exports = MonthlyPlayer;