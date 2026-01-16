const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const LineupPlayer = sequelize.define(
    'LineupPlayer', {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },

        lineup_id: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },

        monthly_player_id: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
    },
    {
        tableName: "lineup_players",
        timestamps: false,
    }
);

module.exports = LineupPlayer;


