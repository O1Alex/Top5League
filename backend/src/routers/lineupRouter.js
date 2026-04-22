const express = require("express");
const lineupRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');
const { validate, lineupValidationRules } =require('../middlewares/validator');

const {
    createLineup,
    getMyLineup,
    updateMyLineup,
    deleteMyLineup,
    deleteLineupById,
    getLineupsByMonthId,
    getCurrentLineups,
    getMyLastMonthLineup

} =require('../controllers/lineupController');





//Public
lineupRouter.get("/current", getCurrentLineups);

// Utilisateur connecté
lineupRouter.post("/me", authenticate, lineupValidationRules.create, validate, createLineup);
lineupRouter.get("/me", authenticate, getMyLineup);
lineupRouter.get("/me/last-month-lineup", authenticate, getMyLastMonthLineup);
lineupRouter.put("/me", authenticate, lineupValidationRules.update, validate, updateMyLineup);
lineupRouter.delete("/me", authenticate, deleteMyLineup);

// Admin
lineupRouter.delete("/:id", authenticate, requireAdmin, deleteLineupById);
lineupRouter.get("/:monthId", authenticate, requireAdmin, getLineupsByMonthId);

module.exports = lineupRouter;