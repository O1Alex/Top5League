const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const OfficialLineupPlayer = sequelize.define(
    'OfficialLineupPlayer', {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        
        official_lineup_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },

        monthly_player_id: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
    },

    {
        tableName: "official_lineup_players",
        timestamps: false,
    }
);

module.exports = OfficialLineupPlayer;


