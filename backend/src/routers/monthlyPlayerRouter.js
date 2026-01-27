const express = require("express");
const monthlyPlayerRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');
const { currentMonth } = require('../middlewares/currentMiddleware');
const { validate, monthlyPlayerValidationRules } =require('../middlewares/validator');

const   {
            createMonthlyPlayerByMonthId,
            getMonthlyPlayersByMonthId,
            getCurrentMonthlyPlayers,
            updateMonthlyPlayerById,
            deleteMonthlyPlayerById
        } = require("../controllers/monthlyPlayerController");


// Route PUBLIC
//Récupérer les joueurs du mois
monthlyPlayerRouter.get("/current", currentMonth, getCurrentMonthlyPlayers);


// Routes ADMIN
monthlyPlayerRouter.post("/:monthId", monthlyPlayerValidationRules.create, validate, authenticate, requireAdmin, createMonthlyPlayerByMonthId); 
monthlyPlayerRouter.get("/:monthId",authenticate, requireAdmin, getMonthlyPlayersByMonthId); 
monthlyPlayerRouter.put("/:id", monthlyPlayerValidationRules.update, validate, monthlyPlayerValidationRules.idParam, authenticate, requireAdmin, updateMonthlyPlayerById);
monthlyPlayerRouter.delete("/:id", monthlyPlayerValidationRules.idParam, validate, authenticate, requireAdmin, deleteMonthlyPlayerById);




module.exports = monthlyPlayerRouter;
