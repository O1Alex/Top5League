const User = require("../models/User")

class userService {

    // Récupérer tous les utilisateurs
    static async getAllUsers() {
        try {
            const users = await User.findAll({
                order: [["username", "ASC"]],
            });
            
            return users;

        } catch (err) {
            throw new Error(`Erreur lors de la récupération des utilisateurs ${err.message}`);
        }
    }

    // Récupérer un utilisateur par son ID
    static async getUserById(id){
        try {
            const user = User.findByPk(id);
            return user;

        } catch (err) {
            throw new Error (`Erreur lors de la récupération de l'utilisateur ${err.message}`);
        }
    }

    // Supprimer un utilisateur en se servant de son ID
    static async deleteUserById(id) {
        try {
            const user = await User.findByPk(id)
            if (!user) {
                    return null;
                }
            await user.destroy();
            
            return user;

        }catch (err) {
            throw new Error(`Erreur lors de la suppression de l'utilisateur ${err.message}`);
        }
    };

}

module.exports = userService;