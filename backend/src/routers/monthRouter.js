const express = require("express");
const monthRouter = express.Router();
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');
const { validate, monthValidationRules } =require('../middlewares/validator');

const   {
            createMonth,
            getAllMonths,
            getMonthById,
            getCurrentMonth,
            updateMonthById,
            deleteMonthById
        } = require("../controllers/monthController");


// Route PUBLIC
monthRouter.get("/current", getCurrentMonth);


// Routes ADMIN
monthRouter.post("/", monthValidationRules.create, validate, authenticate, requireAdmin, createMonth); 
monthRouter.get("/", authenticate, requireAdmin, getAllMonths);
monthRouter.get("/:id", monthValidationRules.idParam, validate, authenticate, requireAdmin, getMonthById);
monthRouter.put("/:id", monthValidationRules.update, monthValidationRules.idParam, validate, authenticate, requireAdmin, updateMonthById);
monthRouter.delete("/:id", monthValidationRules.idParam, validate, authenticate, requireAdmin, deleteMonthById);


module.exports = monthRouter;
