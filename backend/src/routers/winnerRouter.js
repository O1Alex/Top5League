const express = require("express");
const router = express.Router();


router.get("/:monthId", getWinnerByMonth); 

// Ajouter middleware authentification Admin
router.get("/", getAllWinners);
router.post("/:monthId/calculate", calculateWinner);
router.put("/:monthId/reward", markRewardSent);

module.exports = router;
