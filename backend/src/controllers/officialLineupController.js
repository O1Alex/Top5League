const officialLineupService = require("../services/officialLineupService");



// Récupérer le Top 5 Offiel du mois
const getOfficialLineup = async (req, res) =>{
    try {
        const officialLineup = await officialLineupService.getOfficialLineup();

        res.status(200).json({
            success: true,
            message:"Top 5 Officiel du mois réceupéré avec succès",
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


// Supprimer un Top 5 Officiel par son ID
const deleteOfficialLineupById = async (req, res) => {
    try {
        const { id } = req.params;

        await officialLineupService.deleteOfficialLineupById(id);

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


// Récupérer les lineups d'un mois précis par l'ID du mois
const getOfficialLineupByMonthId = async (req, res) => {
    
    try {
        const { monthId } = req.params;

        const officialLineup = await officialLineupService.getOfficialLineupByMonthId(monthId);
        
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

module.exports = {
    getOfficialLineup,
    deleteOfficialLineupById,
    getOfficialLineupByMonthId
};
