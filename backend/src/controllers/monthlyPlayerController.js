const monthlyPlayerService = require('../services/MonthlyPlayerService');

const createMonthlyPlayer = async(req , res)=> {
    try {
        const monthData = req.body;
        
        const newMonth = await monthlyPlayerService.create(monthData);
        res.status(201).json({
            success: true,
            data: newMonth,
        });

    } catch (error) {
        console.error("Erreur lors de la création du joueur", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.messsage}`,
        });  
    }
};





module.exports= {
    createMonthlyPlayer
}