const express = require("express");
const officialLineupRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');
const { validate, officialLineupValidationRules } =require('../middlewares/validator');

const {
    createofficialLineup,
    getofficialLineup,
    deleteofficialLineupById
} =require('../controllers/officialLineupController')


// Utilisateur connecté
officialLineupRouter.post("/", authenticate, requireAdmin, officialLineupValidationRules.create, validate, createofficialLineup);
officialLineupRouter.get("/", authenticate, getofficialLineup);
officialLineupRouter.delete("/",authenticate, requireAdmin, deleteofficialLineupById);


module.exports = officialLineupRouter;