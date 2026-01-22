const express = require("express");
const monthlyPlayerRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');

const   {
            createMonthlyPlayer,
            getAllMonthlyPlayers,
            getMonthlyPlayerById,
            updateMonthlyPlayerById,
            deleteMonthlyPlayerById
        } = require("../controllers/monthlyPlayerController");


// CRUD Ajouter middleware authentification Admin
monthRouter.post("/:monthId", authenticate, requireAdmin, createMonthlyPlayer); 
monthRouter.get("/", getAllMonthlyPlayers);
monthRouter.get("/:id", getMonthlyPlayerById);
monthRouter.put("/:id", authenticate, requireAdmin, updateMonthlyPlayerById);
monthRouter.delete("/:id", authenticate, requireAdmin, deleteMonthlyPlayerById);



module.exports = monthlyPlayerRouter;
