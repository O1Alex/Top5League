const { Sequelize } = require("sequelize");
require("dotenv").config();

// Connexion Base de donnée
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '', {
        host: process.env.DB_HOST,
        dialect: 'mysql',       
        port: process.env.DB_PORT
    });

    module.exports = sequelize;