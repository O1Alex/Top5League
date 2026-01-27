const monthService = require("../services/monthService");

// Créer un mois
const createMonth = async(req , res)=> {
    try {
        const monthData = req.body;
        
        const newMonth = await monthService.createMonth(monthData);
        res.status(201).json({
            success: true,
            data: newMonth,
        });

    } catch (error) {
        console.error("Erreur lors de la création du mois", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.message}`,
        });  
    }
};


// Récupérer tous les mois
const getAllMonths = async(req , res)=> {
     try {
        const months = await monthService.getAllMonths();

        res.status(200).json({
            success: true,
            data: months,
    });
    } catch (error) {
        console.error("Erreur lors de la récupération des mois", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.message}`,
        });
    }
};

// Récupérer un mois par son ID
const getMonthById = async(req , res)=> {
     try {
        const { id } = req.params;

        const month = await monthService.getMonthById(id);

        res.status(200).json({
            success: true,
            data: month,
        });
   } catch (error) {
        console.error("Erreur lors de la récupération du mois", error);
        res.status(500).json({
            success: false,
            message: `Erreur serveur ${error.message}`,
        });        
    }
};

// Récupérer le mois en cours
const getCurrentMonth = async (req, res) => {
    try {
        const month = await monthService.getCurrentMonth();
        res.status(200).json({ 
            success: true, 
            data: month 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Modifier un mois par son ID
const updateMonthById = async (req, res)=> {
    try {
        const { id } = req.params;
        const monthData = req.body;

        const updatedMonth = await monthService.updateMonthById(id, monthData)

        res.status(200).json({
            success: true,
            data: updatedMonth,
        });

    } catch (error) {
        console.error("Erreur lors de la modification du mois", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.message}`,
        }); 
    }
};

// Supprimer un mois par son ID
const deleteMonthById = async(req, res)=> {
    try {
        const { id } = req.params;

        const month = await monthService.deleteMonthById(id);

        res.status(200).json({
            success: true,
            data: month,
    });
    } catch (error) {
        console.error("Erreur lors de la suppression du mois", error);
        res.status(500).json({
            success: false,
             message: `Erreur serveur ${error.messsage}`,
        });   
    }
};


module.exports = {
    createMonth,
    getAllMonths,
    getMonthById,
    getCurrentMonth,
    updateMonthById,
    deleteMonthById
};