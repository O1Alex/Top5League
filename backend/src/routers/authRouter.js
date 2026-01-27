const express = require("express");
const authRouter = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");
const { validate, authValidationRules } = require("../middlewares/validator");


// Route PUBLIC
authRouter.post("/register", authValidationRules.register, validate, register); 
authRouter.post("/login", authValidationRules.login, validate, login);

// Route pour UTILISATEUR CONNECTE
authRouter.get("/me", authenticate, getMe);

module.exports = authRouter;