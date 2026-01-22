const express = require("express");
const monthlyPlayerRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');

const   {
            createMonthlyPlayerByMonthId,
            getMonthlyPlayerByMonthId,
            updateMonthlyPlayerById,
            deleteMonthlyPlayerById
        } = require("../controllers/monthlyPlayerController");


// Créer un nouveau joueur du mois dans un mois précis (par l'ID du mois)
monthlyPlayerRouter.post("/:monthId", authenticate, requireAdmin, createMonthlyPlayerByMonthId); 

// Récupérer les joueurs du mois dans un mois précis (par l'ID du mois)
monthlyPlayerRouter.get("/:monthId", getMonthlyPlayersByMonthId); 

// Modifier un des joueurs du mois (par son ID)
monthlyPlayerRouter.put("/:id", authenticate, requireAdmin, updateMonthlyPlayerById);

// Supprimer un des joueurs du mois (par son ID)
monthlyPlayerRouter.delete("/:id", authenticate, requireAdmin, deleteMonthlyPlayerById);




module.exports = monthlyPlayerRouter;
