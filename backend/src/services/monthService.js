const Month = require("../models/Month")

class monthService {

    // Créer un mois
    static async createMonth(monthData){
        try{
            const currentDate  = new Date();
            if (new Date(monthData.end_date) < new Date(currentDate)) {
                monthData.status = "closed";
            }

            const newMonth = await Month.create(monthData);
            return newMonth;

        } catch (err) {
            throw new Error (`Erreur lors de la creation du mois ${err.message}`);
        }
    }

    // Récupérer tous les mois
    static async getAllMonths(){
        try {
            const months = await Month.findAll();
            return months;

        } catch (err) {
            throw new Error (`Erreur lors de la récupération des mois ${err.message}`);
        }
    }

    // Récupérer un mois par son ID
    static async getMonthById(id){
        try {
            const month = await Month.findByPk(id);
            return month;

        } catch (err) {
            throw new Error (`Erreur lors de la récupération du mois ${err.message}`);
        }
    }

    // Récupérer le mois en cours
    static async getCurrentMonth() {
        let month = await Month.findOne({
            where: { status: "open" },
            order: [["start_date", "DESC"]],
        });

        // Si aucun mois ouvert
        if (!month) {
        month = await Month.findOne({
            where: { status: "closed" },
            order: [["end_date", "DESC"]],
        });
        }

        return month;
  }

    // Récupérer le mois passé (pour définir le gagnant)
    static async getLastPublishedMonth() {
        const month = await Month.findOne({
            where: { status: "published" },
            order: [["publish_date", "DESC"]],
        });

        if (!month) {
            throw new Error("Aucun mois publié trouvé");
        }

        return month;
    }

    // Récupérer le dernier mois fermé
    static async getLastClosedMonth() {
    const month = await Month.findOne({
        where: { status: "closed" },
        order: [["end_date", "DESC"]],
    });

    if (!month) {
        throw new Error("Aucun mois fermé trouvé");
    }

    return month;
}

    // Modifier un mois en se servant de son ID
    static async updateMonthById(id, monthData){
        try {
            const month = await Month.findByPk(id);
            if(!month){
                return null;
            }
            await month.update(monthData);
            return month;

        } catch (err) {
            throw new Error (`Erreur lors de la modification du mois ${err.message}`);
        }
    }

    // Supprimer un mois en se servant de son ID
    static async deleteMonthById(id) {
        try {
            const month = await Month.findByPk(id)
        if (!month) {
                return null;
            }
        await month.destroy();
        return true;

        }catch (err) {
            throw new Error(`Erreur lors de la suppression du mois ${err.message}`);
        }
    };

}

module.exports = monthService;