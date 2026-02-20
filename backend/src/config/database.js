const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;
// Base de données pour test unitaire
if (process.env.NODE_ENV === "test"){
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ":memory:",
        logging: false
    });

// Connexion Base de données principal du site
} else {
    sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '', {
        host: process.env.DB_HOST,
        dialect: 'mysql',       
        port: process.env.DB_PORT
    });
}

module.exports = sequelize;