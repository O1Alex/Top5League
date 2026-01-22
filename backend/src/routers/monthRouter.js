const express = require("express");
const monthRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');

const   {
            createMonth,
            getAllMonths,
            getMonthById,
            updateMonthById,
            deleteMonthById
        } = require("../controllers/monthController");


// CRUD Ajouter middleware authentification Admin
monthRouter.post("/", authenticate, requireAdmin, createMonth); 
monthRouter.get("/", authenticate, requireAdmin, getAllMonths);
monthRouter.get("/:id", authenticate, requireAdmin, getMonthById);
monthRouter.put("/:id", authenticate, requireAdmin, updateMonthById);
monthRouter.delete("/:id", authenticate, requireAdmin, deleteMonthById);



module.exports = monthRouter;
