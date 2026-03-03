const express = require("express");
const officialLineupRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');
const { validate, officialLineupValidationRules } =require('../middlewares/validator');

const {
    getOfficialLineup,
    createOfficialLineup,
    getOfficialLineupByMonthId,
    updateOfficialLineup,
    deleteOfficialLineupByMonthId
} =require('../controllers/officialLineupController')


// Utilisateur connecté
officialLineupRouter.get("/current", getOfficialLineup);


// Admin
officialLineupRouter.post("/", authenticate, requireAdmin, officialLineupValidationRules.create, validate, createOfficialLineup);
officialLineupRouter.get("/:monthId", authenticate, requireAdmin, getOfficialLineupByMonthId);
officialLineupRouter.put("/", authenticate, requireAdmin, officialLineupValidationRules.update, validate, updateOfficialLineup);
officialLineupRouter.delete("/:monthId",authenticate, requireAdmin, deleteOfficialLineupByMonthId);


module.exports = officialLineupRouter;