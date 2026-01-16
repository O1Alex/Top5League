const {app, PORT} = require ("./server")


app.listen(PORT, ()=>{
    console.log("Serveur démarré avec succès !")
});