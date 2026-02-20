const express = require("express");
const cors = require("cors");

const routes = require("./routers/index");

const app = express();

// Middlewares
var corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

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