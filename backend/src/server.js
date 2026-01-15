const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded ({extended : true}));


// Connexion Base de donnée
const sequelize = new Sequelize(
    'Top5League', 
    process.env.DB_USER || 'username',
    process.env.DB_PASSWORD || '', {
        host: process.env.DB_HOST,
        dialect: 'mysql',       
        port: process.env.DB_PORT
});


// Test connexion BDD
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


//Synchronisation BDD et serveur
sequelize.sync({ alter:true})
  .then(()=> {
    console.log("modele synchronisé avec la base de donnée")
  })
  .catch(()=>{
    console.log("Erreur de synchronisation du modèle avec la base de donnée")
  });



//Afficher les erreurs présente 
app.use((err, req, res, next)=>{
    console.error('Erreur:' , err)
    res.status(500).json({
      success: false,
      message: "Erreur serveur !",
    }) 
});



  module.exports = app;