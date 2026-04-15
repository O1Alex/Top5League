const sequelize = require("./config/database");
require("dotenv").config();


// Chargement models + association
require("./models");

const app = require("./app");

const PORT = process.env.SERVER_PORT || 3000;


// Test connexion BDD
async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de donnée réalisé avec succès.");

  } catch (error) {
    console.error("Impossible de se connecter à la base de données :", error);
  }
}


//Synchronisation des modèles avec la BDD
sequelize.sync({ alter:true })
  .then(()=> {
    console.log("Model synchronisé avec la base de données")
  })
  .catch(()=>{
    console.log("Erreur de synchronisation du modèle avec la base de données")
  });



start();

module.exports = PORT;