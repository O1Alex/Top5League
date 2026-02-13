const express = require("express");
const winnerRouter = express.Router();
const { authenticate, requireAdmin } = require("../middlewares/authMiddleware");
const { winnerValidationRules, validate } = require("../middlewares/validator");
const   {
            computeWinner,
            getWinnerByMonthId,
            getCurrentWinner,
            getCurrentWinnerLineup
            
        } = require("../controllers/winnerController")


// Routes ADMIN
winnerRouter.post("/:monthId", authenticate, requireAdmin, winnerValidationRules.create, validate, computeWinner )

// Routes Utilisateur connecté
winnerRouter.get("/:monthId", authenticate, getWinnerByMonthId );

// Routes public
winnerRouter.get("/current", getCurrentWinner);
winnerRouter.get("/lineup", getCurrentWinnerLineup);

module.exports = winnerRouter;