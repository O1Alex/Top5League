const express = require("express");
const monthRouter = express.Router();



// CRUD Ajouter middleware authentification Admin
monthRouter.post("/", createMonth); 
monthRouter.get("/", getAllMonths);
monthRouter.get("/:id", getMonthById);
monthRouter.put("/:id", updateMonthById);
monthRouter.delete("/:id", deleteMonthById);



// Routes "metier"
monthRouter.get("/current", getCurrentMonth); // GET /months/current
monthRouter.post("/generate", requireAuth, requireAdmin, generateMonth); // POST /months/generate
monthRouter.put("/:id/status", requireAuth, requireAdmin, changeMonthStatus); // PUT /months/:id/status


module.exports = monthRouter;
