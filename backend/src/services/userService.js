const User = require("../models/User")

class userService {

    // Créer un utilisateur
    static async createUser(userData){
        try{
            const newUser = User.create(userData);
            return newUser;

        } catch (err) {
            throw new Error (`Erreur lors de la creation de l'utilisateur ${err.message}`);
        }
    }

    // Récupérer tous les utilisateurs
    static async getAllUsers(){
        try {
            const users = User.findAll();
            return users;

        } catch (err) {
            throw new Error (`Erreur lors de la récupération des utilisateurs ${err.message}`);
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

    // Modifier un utilisateur en se servant de son ID
    // static async updateUserById(id, userData){
    //     try {
    //         const user = await User.findByPk(id);
    //         if(!user){
    //             throw new Error (`User ${id} non trouvé`);
    //         }
    //         await user.update(userData);
    //         return user;

    //     } catch (err) {
    //         throw new Error (`Erreur lors de la modification de l'utilisateur ${err.message}`);
    //     }
    // }

    // Supprimer un utilisateur en se servant de son ID
    static async deleteUserById(id) {
        try {
            const user = await User.findByPk(id)
            if (!user) {
                    throw new Error(`User ${id} non trouvé`);
                }
            await User.destroy();
            return user;

        }catch (err) {
            throw new Error(`Erreur lors de la suppression de l'utilisateur ${err.message}`);
        }
    };

}

module.exports = userService;