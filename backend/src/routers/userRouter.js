const express = require("express");
const userRouter = express.Router();

const   {
            createUser,
            getAllUsers,
            getUserById,
            updateUserById,
            deleteUserById
        } = require("../controllers/userController")


userRouter.get("/", getAllUsers); // Ajouter middleware authentification Admin
userRouter.get("/:id", getUserById); // Ajouter middleware authentification Admin
userRouter.put("/:id", updateUserById); // Pas sur que dans ce projet pas prévus de mpouvoir modifier les infos perso
userRouter.delete("/:id", deleteUserById); // Ajouter middleware authentification Admin

module.exports = userRouter;