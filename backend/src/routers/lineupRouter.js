const express = require("express");
const lineupRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');
const { validate, lineupValidationRules } =require('../middlewares/validator');

const {
    createLineup,
    getMyLineup,
    deleteMyLineup,
    deleteLineupById,
    getLineupsByMonthId
} =require('../controllers/lineupController')


// Utilisateur connecté
lineupRouter.post("/", authenticate, lineupValidationRules.create, validate, createLineup);
lineupRouter.get("/me", authenticate, getMyLineup);
lineupRouter.delete("/me", authenticate, deleteMyLineup);

// Admin
lineupRouter.delete("/:id", authenticate, requireAdmin, deleteLineupById);
lineupRouter.get("/me", authenticate, requireAdmin, getLineupsByMonthId);

module.exports = lineupRouter;