const lineupService = require("../services/lineupService");

// Créer un nouveau joueur du mois dans un mois précis (par l'ID du mois)
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


// Récupérer mon lineup du mois
const getMyLineup = async (req, res) => {
    try {
        const userId = req.user.id;

        const lineup = await lineupService.getMyLineup(userId);

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

// Supprimer son lineup du mois ouvert
const deleteMyLineup = async (req, res) => {
     try {
        const userId = req.user.id;

        const lineup = await lineupService.deleteMyLineup(userId);

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

// Récupérer les lineups d'un mois précis par l'ID du mois
const getLineupsByMonthId = async (req, res) => {
    
    try {
        const { monthId } = req.params;

        const lineups = await lineupService.getLineupsByMonthId(monthId);
        
        res.status(200).json({
            success: true,
            data: lineups,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des joueurs", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
};

module.exports = {
  createLineup,
  getMyLineup,
  deleteMyLineup,
  deleteLineupById,
  getLineupsByMonthId
};
