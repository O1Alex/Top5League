const officialLineupService = require("../services/officialLineupService");


// Créer le Top 5 Officiel du mois
const createOfficialLineup = async (req, res) => {
    try {
        const picks = req.body.picks;

        if (!picks || picks.length !== 5) {
            return res.status(400).json({
                success: false,
                message: "Le Top 5 doit contenir exactement 5 joueurs",
            });
        }

        const newOfficialLineup = await officialLineupService.createOfficialLineup(picks);
        
        res.status(201).json({
        success: true,
        data: newOfficialLineup,
        });

    } catch (error) {

        // Erreurs métier
        if (
            error.message.includes("existe déjà") ||
            error.message.includes("invalides") ||
            error.message.includes("manquant")
        ) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Erreur lors de la création du Top 5 Officiel", error);
        res.status(500).json({
        success: false,
        message: `Erreur serveur ${error.message}`,
    });
    }
}


// Récupérer le Top 5 Officiel du mois
const getOfficialLineup = async (req, res) =>{
    try {
        const officialLineup = await officialLineupService.getOfficialLineup();

        if(!officialLineup){
             return res.status(404).json({
                success: false,
                message: "Auncun lineup officiel trouvé",
            });
        }

        res.status(200).json({
            success: true,
            message:"Top 5 Officiel du mois recupéré avec succès",
            data: officialLineup
        });

    } catch (error) {
        console.error("Erreur lors de la récupération du Top 5 Officiel du mois", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });
    }
}


// Récupérer les lineups d'un mois précis par l'ID du mois
const getOfficialLineupByMonthId = async (req, res) => {
    
    try {
        const { monthId } = req.params;

        const officialLineup = await officialLineupService.getOfficialLineupByMonthId(monthId);

        if(!monthId){
             return res.status(404).json({
                success: false,
                message: "Auncun mois trouvé",
            });
        }

        if(!officialLineup){
             return res.status(404).json({
                success: false,
                message: "Auncun lineup officiel trouvé",
            });
        }
        
        res.status(200).json({
            success: true,
            data: officialLineup,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération du Lineup Officiel", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
};


// Modifier le Top 5 Officiel du mois
const updateOfficialLineup = async (req, res) => {
    try {
        const picks = req.body.picks;

        const updatedOfficialLineup = await officialLineupService.updateOfficialLineup(picks);

        if(!updatedOfficialLineup){
             return res.status(404).json({
                success: false,
                message: "Auncun lineup officiel trouvé",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedOfficialLineup,
            message: "Top 5 Officiel mis à jour avec succès",
        });

    } catch (error) {
        console.error("Erreur lors de la modification du Top 5 Officiel", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });
    }
};



// Supprimer un Top 5 Officiel par son ID
const deleteOfficialLineupByMonthId = async (req, res) => {
    try {
        const { monthId } = req.params;

        const deletedOfficialLineup = await officialLineupService.deleteOfficialLineupByMonthId(monthId);

        if(!deletedOfficialLineup){
             return res.status(404).json({
                success: false,
                message: "Auncun lineup officiel trouvé pour ce mois",
            });
        }

        res.status(200).json({
        success: true,
        message: "Top 5 Officiel supprimé avec succès"
        });

    } catch (error) {
        console.error("Erreur lors de suppression la du Top 5 Officiel", error);
        res.status(500).json({
        success: false,
        message: `Erreur serveur ${error.message}`,
        });
    }
};


module.exports = {
    createOfficialLineup,
    getOfficialLineup,
    deleteOfficialLineupByMonthId,
    updateOfficialLineup,
    getOfficialLineupByMonthId
};
