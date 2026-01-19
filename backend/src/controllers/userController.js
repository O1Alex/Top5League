const userService = require("../services/userService");

// Créer un utilisateur
const createUser = async(req , res)=> {
    try {
        const userData = req.body;
        
        const newUser = await userService.createUser(userData);
        res.json({
            success: true,
            data: newUser,
        });

    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.messsage}`,
        });  
    }
};

// Récupérer tous les utilisateurs
const getAllUsers = async(req , res)=> {
     try {
        const users = await userService.getAllUsers();

        res.json({
            success: true,
            data: users,
    });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.messsage}`,
        });
    }
};

// Récupérer un utilisateur par son ID
const getUserById = async(req , res)=> {
     try {
        const { id } = req.params;

        const user = await userService.getUserById(id);

        res.json({
            success: true,
            data: user,
    });
   } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.messsage}`,
        });        
    }
};

// Modifier un utilisateur par son ID
const updateUserById = async (req, res)=> {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updatedUser = await userService.updateUserById(id, userData)

        res.json({
            success: true,
            data: updatedUser,
        });

    } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.messsage}`,
        }); 
    }
};

// Supprimer un utilisateur par son ID
const deleteUserById = async(req, res)=> {
    try {
        const { id } = req.params;

        const user = await userService.deleteUserById(id);

        res.json({
            success: true,
            data: user,
    });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.messsage}`,
        });   
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};