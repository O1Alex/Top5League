const lineupService = require('../services/lineupService');


// Créer un nouveau joueur du mois dans un mois précis (par l'ID du mois)
const createLineupByMonthId = async(req , res)=> {
    try {
        const { monthId } = req.params;
        const lineupData = req.body;
        
        const newLineup = await lineupService.createLineupByMonthId(monthId, lineupData);
        
        res.status(201).json({
            success: true,
            data: newLineup,
        });

    } catch (error) {
        console.error("Erreur lors de la création du Top 5", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
};



// Récupérer les joueurs du mois dans un mois précis (par l'ID du mois)
const getLineupsByMonthId = async(req , res)=> {
    try {
        const { monthId } = req.params;

        const lineups = await lineupService.getLineupsByMonthId(monthId);
        
        res.status(200).json({
            success: true,
            data: lineups,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des Top 5", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
};



// Supprimer un joueur du mois par son ID
const deleteLineupById = async(req, res)=> {
    try {
        const { id } = req.params;

        const lineup = await userService.deleteLineupById(id);

        res.status(200).json({
            success: true,
            data: lineup,
    });
    } catch (error) {
        console.error("Erreur lors de la suppression du Top 5", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });   
    }
};




module.exports= {
    createLineupByMonthId,
    getLineupsByMonthId,
    deleteLineupById,
}