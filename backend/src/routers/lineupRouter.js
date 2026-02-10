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
    getLineupsByMonthId
} =require('../controllers/lineupController');




// Utilisateur connecté
lineupRouter.post("/me", authenticate, lineupValidationRules.create, validate, createLineup);
lineupRouter.get("/me", authenticate, getMyLineup);
lineupRouter.put("/me", authenticate, lineupValidationRules.update, validate, updateMyLineup);
lineupRouter.delete("/me", authenticate, deleteMyLineup);

// Admin
lineupRouter.delete("/:id", authenticate, requireAdmin, deleteLineupById);
lineupRouter.get("/:monthId", authenticate, requireAdmin, getLineupsByMonthId);

module.exports = lineupRouter;