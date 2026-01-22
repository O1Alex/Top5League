const express = require("express");
const authRouter = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");


authRouter.post("/register", register); 
authRouter.post("/login", login);     
authRouter.get("/me", authenticate,  getMe);

module.exports = authRouter;