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

module.exports = {
    computeWinner
};