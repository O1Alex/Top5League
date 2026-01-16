const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const User = sequelize.define(
    'Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        username: {
            type: Datatypes.STRING(50),
            allowNull: false
        },
        
        email: { 
            type: DataTypes.STRING(100),
            allowNull: false, 
            unique: true 
        },
            
        password: { 
            type: DataTypes.STRING(255), 
            allowNull: false 
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user"
        },

        favorite_player: { 
            type: DataTypes.STRING(100), 
            allowNull: true 
        }
    },

    {
        tableName: "users",
        timestamps: true,
    }
);

module.exports = User;


