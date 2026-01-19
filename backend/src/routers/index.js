const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRouter"));
router.use("/users", require("./userRouter"));
router.use("/months", require("./monthRouter"));
router.use("/winners", require("./winnersRouter"));


module.exports = router;