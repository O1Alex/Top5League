const express = require("express");
const userRouter = express.Router();
const { authenticate, requireAdmin } = require("../middlewares/authMiddleware");

const   {
            getAllUsers,
            getUserById,
            deleteUserById
        } = require("../controllers/userController")


userRouter.get("/", authenticate, requireAdmin, getAllUsers);
userRouter.get("/:id", authenticate, requireAdmin, getUserById);
userRouter.delete("/:id", authenticate, requireAdmin,  deleteUserById);

module.exports = userRouter;