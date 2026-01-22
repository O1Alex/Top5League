const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const monthRouter = require("./monthRouter");



router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/month", monthRouter);



module.exports = router;