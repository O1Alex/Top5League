const express = require("express");
const authRouter = express.Router();


authRouter.post("/register", register); 
authRouter.post("/login", login);     
authRouter.get("/me", getMe);  //Ajouter Middleware d'authentification

module.exports = authRouter;