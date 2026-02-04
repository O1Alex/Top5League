const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const monthRouter = require("./monthRouter");
const monthlyPlayerRouter = require ("./monthlyPlayerRouter");
const lineupRouter = require ("./lineupRouter");
const officialLineupRouter = require("./officialLineupRouter");



router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/months", monthRouter);
router.use("/monthlyPlayers", monthlyPlayerRouter);
router.use("/lineups", lineupRouter);
router.use("/officialLineup", officialLineupRouter);



module.exports = router;