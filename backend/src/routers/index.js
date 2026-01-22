const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const monthRouter = require("./monthRouter");
const monthlyPlayerRouter = require ("./monthlyPlayerRouter")



router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/month", monthRouter);
router.use("/monthlyPlayer", monthlyPlayerRouter);



module.exports = router;