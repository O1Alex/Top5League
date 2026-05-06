const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

const routes = require("./routers/index");

const app = express();

// Chemin image BDD vers front
app.use('/public', express.static(path.resolve(__dirname, '../public')));

// Middlewares
var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(helmet);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error("Erreur:", err);
    res.status(500).json({
        success: false,
        message: "Erreur serveur",
    });
});


module.exports = app;