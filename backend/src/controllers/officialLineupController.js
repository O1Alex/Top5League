const officialLineupService = require("../services/officialLineupService");


// Créer le Top 5 Officiel du mois
const createOfficialLineup = async (req, res) => {
    try {
        const picks = req.body.picks;

        const newOfficialLineup = await officialLineupService.createOfficialLineup(picks);
        
        res.status(201).json({
        success: true,
        data: newOfficialLineup,
        });
    } catch (error) {
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


module.exports = {
    createOfficialLineup,
    getOfficialLineup,
    deleteOfficialLineupById,
    updateOfficialLineup,
    getOfficialLineupByMonthId
};
