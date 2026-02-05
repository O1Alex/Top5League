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

         predicted_pts: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },

        predicted_ast: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },

        predicted_reb: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
    },
    {
        tableName: "lineup_players",
        timestamps: false,
    }
);

module.exports = LineupPlayer;


