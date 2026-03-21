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


// Routes public
winnerRouter.get("/current", getCurrentWinner);
winnerRouter.get("/lineup", getCurrentWinnerLineup);

// Routes Utilisateur connecté
winnerRouter.get("/:monthId", authenticate, getWinnerByMonthId );

// Routes ADMIN
winnerRouter.post("/:monthId", authenticate, requireAdmin, winnerValidationRules.create, validate, computeWinner );



module.exports = winnerRouter;