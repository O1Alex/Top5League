const winnerService = require("../services/winnerService");

// Calcul et création du gagnant
const computeWinner = async (req, res) => {
    try {
        const { monthId } = req.params;
        const result = await winnerService.computeWinner(monthId);
    
        res.status(201).json({
            success: true,
            data: result,
        });
        
    } catch (error) {
        console.error("Erreur lors du calcul ou de la création du gagant", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
}


const getWinnerByMonthId = async (req, res) => {
    try{
        const { monthId } = req.params;

        if(!monthId){
            return res.status(400).json({
                success: false,
                message: "Id du mois recquis",
            });
        }

        const winner = await winnerService.getWinnerByMonthId(monthId);

        res.status(200).json({
            success: true,
            data: winner,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération du gagnant du mois choisi", error);

        if (
            error.message.toLowerCase().includes("non trouvé") ||
            error.message.toLowerCase().includes("aucun gagnant")
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
}


const getCurrentWinner = async (req, res) => {
    try{
        const winner = await winnerService.getCurrentWinner();

        if(!winner){
            return res.status(404).json({
                success: false,
                message: "Aucun gagnant pour le mois en cours",
            });
        }

        res.status(200).json({
            success: true,
            data: winner,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération du gagnant du mois", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });  
    }
}


const getCurrentWinnerLineup = async (req, res) => {
    try {
        const winner = await winnerService.getCurrentWinnerLineup();

        if(!winner){
            return res.status(404).json({
                success: false,
                message: "Aucun lineup du gagnant pour le mois en cours",
            });
        }

        res.status(200).json({
            success: true,
            message:"Top 5 gagnant du mois récupéré avec succès",
            data: winner
        });


    } catch (error) {
        console.error("Erreur lors de la récupération du Top 5  du gagnant du mois", error);

        if (
            error.message.toLowerCase().includes("gagnant") ||
            error.message.toLowerCase().includes("introuvable")
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });
    }

}


module.exports = {
    computeWinner,
    getWinnerByMonthId,
    getCurrentWinner,
    getCurrentWinnerLineup
};