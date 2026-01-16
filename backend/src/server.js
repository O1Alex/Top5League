const express = require('express');
require ('dotenv').config();
const sequelize = require("./config/database");

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded ({extended : true}));



// Test connexion BDD
async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de donnée réalisé avec succès.");

  } catch (error) {
    console.error("Impossible de se connecter à la base de données :", error);
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
 