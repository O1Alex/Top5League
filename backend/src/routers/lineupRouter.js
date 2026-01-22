const express = require("express");
const userRouter = express.Router();
const { authenticate, requireAdmin } = require("../middlewares/authMiddleware");


// Créer un nouveau Top5 du mois (par l'ID du mois)
lineupRouter.post("/:monthId", authenticate, createLineupByMonthId);

// Récupérer les top 5 du mois de tous les utilisateurs (par l'ID du mois)
lineupRouter.get("/:monthId", authenticate, requireAdmin, getLineupsByMonthId);

// Récupérer mon top 5 du mois (par l'ID du mois)
// lineupRouter.post("/:monthId", authenticate, getMyLineupByMonthId ); A voir car ne sait pas comment faire en sorte de récupérérer son Lineup automatiquement

// Supprimer un Top 5 par son ID
lineupRouter.delete("/:id", authenticate, requireAdmin, deleteLineupById);

