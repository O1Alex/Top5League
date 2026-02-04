const express = require("express");
const officialLineupRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');
const { validate, officialLineupValidationRules } =require('../middlewares/validator');

const {
    getOfficialLineup,
    createOfficialLineup,
    getOfficialLineupByMonthId,
    updateOfficialLineup,
    deleteOfficialLineupById
} =require('../controllers/officialLineupController')


// Utilisateur connecté
officialLineupRouter.get("/current", authenticate, getOfficialLineup);


// Admin
officialLineupRouter.post("/", authenticate, requireAdmin, officialLineupValidationRules.create, validate, createOfficialLineup);
officialLineupRouter.get("/:monthid", authenticate, requireAdmin, getOfficialLineupByMonthId);
officialLineupRouter.put("/", authenticate, requireAdmin, officialLineupValidationRules.update, validate, updateOfficialLineup);
officialLineupRouter.delete("/id",authenticate, requireAdmin, deleteOfficialLineupById);


module.exports = officialLineupRouter;