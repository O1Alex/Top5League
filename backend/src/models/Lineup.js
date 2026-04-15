const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");
const Lineup = sequelize.define(
    'Lineup', {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },

        user_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },

        month_id: { type: DataTypes.INTEGER, 
            allowNull: false 
        },
    },

    {
        tableName: "lineups",
        timestamps: false,
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ["user_id", "month_id"],
            },
        ],
    }
);

module.exports = Lineup;


