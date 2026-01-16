const express = require('express');
const { Sequelize } = require('sequelize');
require ('dotenv').config();

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded ({extended : true}));


// Connexion Base de donnée
const sequelize = new Sequelize(
    'Top5League', 
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '', {
        host: process.env.DB_HOST,
        dialect: 'mysql',       
        port: process.env.DB_PORT
});


// Test connexion BDD
async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de donnée réalisé avec succès.");

  } catch (error) {
    console.error("Impossible de se connecter à la DB :", error);
  }
}

start();



//Afficher les erreurs présente 
app.use((err, req, res, next)=>{
    console.error('Erreur:' , err)
    res.status(500).json({
      success: false,
      message: "Erreur serveur !",
    }) 
});



  module.exports = {app, PORT};
 