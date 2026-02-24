const userService = require("../services/userService");
const sanitizeUser = require("../utils/sanitizers/user.sanitizer");

// Récupérer tous les utilisateurs
const getAllUsers = async(req , res)=> {
     try {
        const users = await userService.getAllUsers();

        const sanitizedUsers = users.map(sanitizeUser);

        res.status(200).json({
            success: true,
            data: sanitizedUsers,
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

        // Si utilisateur inexistant
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }

        res.status(200).json({
            success: true,
            data: sanitizeUser(user),
    });
   } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
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

        // Si utilisateur inexistant
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }

        res.status(200).json({
            success: true,
            message: "Utilisateur supprimé avec succès"
    });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });   
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById
};