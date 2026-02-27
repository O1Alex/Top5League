const lineupService = require("../services/lineupService");

// Créer son Top 5 du mois
const createLineup = async (req, res) => {
    try {
        const userId = req.user.id;
        const picks = req.body.picks;

        const newLineup = await lineupService.createLineup(userId, picks);

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


// Récupérer son Top 5 du mois
const getMyLineup = async (req, res) => {
    try {
        const userId = req.user.id;

        const lineup = await lineupService.getMyLineup(userId);

        if(!lineup){
            return res.status(404).json({
                success: false,
                message: "Aucun Top 5 trouvé pour ce mois",
            });
        }

        res.status(200).json({
        success: true,
        data: lineup,
        });
        
    } catch (error) {
        console.error("Erreur lors de la récupération de votre Top 5", error);
        res.status(500).json({
        success: false,
        message: `Erreur serveur ${error.message}`,
        });
    }
};


// Récupérer tous les Top 5 d'un mois précis par l'ID du mois
const getLineupsByMonthId = async (req, res) => {
    
    try {
        const { monthId } = req.params;

        const lineups = await lineupService.getLineupsByMonthId(monthId);

        if(!lineups){
            return res.status(404).json({
                success: false,
                message: "Mois non troubé",
            });
        }

        if (lineups.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Aucun Top 5 trouvé pour le mois choisi"
            });
}

        res.status(200).json({
            success: true,
            data: lineups,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des lineups", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
};


// Modifier son Top 5 du mois
const updateMyLineup = async (req, res) => {
    try {
        const userId = req.user.id;
        const picks = req.body.picks;

        const updatedLineup = await lineupService.updateMyLineup(userId,picks);

        if(!updatedLineup){
            return res.status(404).json({
                success: false,
                message: "Aucun Top 5 trouvé pour ce mois",
            });
        }

        res.status(200).json({
            success: true,
            message: "Top 5 du mois mis à jour avec succès",
            data: updatedLineup,
        });

    } catch (error) {
        console.error("Erreur lors de la modification du Top 5", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });
    }
};


// Supprimer son Top 5 du mois
const deleteMyLineup = async (req, res) => {
     try {
        const userId = req.user.id;

        const lineup = await lineupService.deleteMyLineup(userId);

         if(!lineup){
            return res.status(404).json({
                success: false,
                message: "Aucun Top 5 trouvé pour ce mois",
            });
        }

        res.status(200).json({
        success: true,
        data: lineup,
        });
        
    } catch (error) {
        console.error("Erreur lors de la suppression de votre Top 5", error);
        res.status(500).json({
        success: false,
        message: `Erreur serveur ${error.message}`,
        });
    }
};


// Supprimer un Top 5 par son ID
const deleteLineupById = async (req, res) => {
    try {
        const { id } = req.params;

        const lineup = await lineupService.deleteLineupById(id);

         if(!lineup){
            return res.status(404).json({
                success: false,
                message: "Aucun Top 5 trouvé pour ce mois",
            });
        }

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



module.exports = {
    createLineup,
    getMyLineup,
    getLineupsByMonthId,
    updateMyLineup,
    deleteMyLineup,
    deleteLineupById
  
};
