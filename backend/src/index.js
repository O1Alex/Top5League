const PORT = require ("./server");
const app = require ('./app');


app.listen(PORT, ()=>{
    console.log("Serveur démarré avec succès !")
});