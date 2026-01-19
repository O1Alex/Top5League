const express = require("express");
const monthRouter = express.Router();

const   {
            createMonth,
            getAllMonths,
            getMonthById,
            updateMonthById,
            deleteMonthById
        } = require("../controllers/monthController");


// CRUD Ajouter middleware authentification Admin
monthRouter.post("/", createMonth); 
monthRouter.get("/", getAllMonths);
monthRouter.get("/:id", getMonthById);
monthRouter.put("/:id", updateMonthById);
monthRouter.delete("/:id", deleteMonthById);



module.exports = monthRouter;
