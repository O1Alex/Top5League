const express = require('express');
require ('dotenv').config();
const sequelize = require("./config/database");
const routes = require('./routers/index')
const cors = require('cors')

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

//Synchronisation des modèles avec la BDD
sequelize.sync({ alter:true})
  .then(()=> {
    console.log("Model synchronisé avec la base de données")
  })
  .catch(()=>{
    console.log("Erreur de synchronisation du modèle avec la base de données")
  });


//Gestion erreurs
app.use((err, req, res, next)=>{
    console.error('Erreur:' , err)
    res.status(500).json({
      success: false,
      message: "Erreur serveur !",
    }) 
});


//Importation des routes
app.use("/api", routes);

  module.exports = {app, PORT};
 

// Middleware
// cors:
var corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));