const monthlyPlayerService = require('../services/MonthlyPlayerService');


// Créer un nouveau joueur du mois dans un mois précis (par l'ID du mois)
const createMonthlyPlayerByMonthId = async(req , res)=> {
    try {
        const { monthId } = req.params;
        const monthlyPlayerData = req.body;
        
        const newMonthlyPlayer = await monthlyPlayerService.createMonthlyPlayerByMonthId(monthId, monthlyPlayerData);
        
        res.status(201).json({
            success: true,
            data: newMonthlyPlayer,
        });

    } catch (error) {
        console.error("Erreur lors de la création du joueur", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
};


// Récupérer les joueurs du mois dans un mois précis (par l'ID du mois)
const getMonthlyPlayersByMonthId = async(req , res)=> {
    try {
        const { monthId } = req.params;

        const monthlyPlayers = await monthlyPlayerService.getMonthlyPlayersByMonthId(monthId);
        
        res.status(200).json({
            success: true,
            data: monthlyPlayers,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des joueurs", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
};

// Récupérer tous les joueurs du mois en cours
const getCurrentMonthlyPlayers= async(req, res)=>{

    // Middleware
    const monthId = req.currentMonth.id;

    try{
        const monthlyPlayers = await monthlyPlayerService.getMonthlyPlayersByMonthId(monthId);

        res.status(200).json({
            success: true,
            data: monthlyPlayers,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des joueurs du mois en cours", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// Modifier un joueur du mois par son ID
const updateMonthlyPlayerById = async (req, res)=> {
    try {
        const { id } = req.params;
        const monthlyPlayerData = req.body;

        const monthlyPlayer = await monthlyPlayerService.updateMonthlyPlayerById(id, monthlyPlayerData)
        
         res.status(200).json({
            success: true,
            data: monthlyPlayer,
        });

   } catch (error) {
        console.error("Erreur lors de la modification du joueur", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.message}`,
        }); 
    }
}


// Supprimer un joueur du mois par son ID
const deleteMonthlyPlayerById = async(req, res)=> {
    try {
        const { id } = req.params;

        const monthlyPlayer = await monthlyPlayerService.deleteMonthlyPlayerById(id);

        res.status(200).json({
            success: true,
            data: monthlyPlayer,
    });
    } catch (error) {
        console.error("Erreur lors de la suppression du joueur", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });   
    }
};






module.exports= {
    createMonthlyPlayerByMonthId,
    getMonthlyPlayersByMonthId,
    getCurrentMonthlyPlayers,
    deleteMonthlyPlayerById,
    updateMonthlyPlayerById
}