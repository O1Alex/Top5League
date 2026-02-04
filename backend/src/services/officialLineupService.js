const Month = require("../models/Month");
const OfficialLineup = require("../models/OfficialLineup");
const { MonthlyPlayer, sequelize, OfficialLineupPlayer } = require("../models");
const { Op } = require("sequelize");
const monthService = require("./monthService");

class officialLineupService {

    
    // Créer le Top 5 Officiel du mois
    static async createofficialLineup() {
        try {
            
        } catch (err) {
        throw new Error(`Erreur lors de la creation du Top 5 ${err.message}`);
        }
    }



    // Récupérerle Top 5 gagnant Officiel du mois
    static async getOfficialLineup() {
        try {
            const month = await monthService.getCurrentMonth();

            const officialLineup = await OfficialLineup.findOne({
                where: { month_id: month.id },
                include: [{ model: MonthlyPlayer, through: { attributes: [] } }],
            });

            if (!officialLineup) {
                throw new Error("Aucun Top 5 officiel publié pour le mois en cours");
            }

            return officialLineup;

        } catch (err) {
            throw new Error(
            `Erreur lors de la récupération du Top 5 Officiel : ${err.message}`);
        }
    }



    // Supprimer un des offcialLineup (par l'ID du mois)
    static async deleteOfficialLineupById(id) {
        try {
            const officialLineup = await OfficialLineup.findByPk(id);

            if (!officialLineup) {
                throw new Error(`Top 5 officiel ${id} non trouvé`);
            }

            await officialLineup.destroy();
            return true;

        } catch (err) {
        throw new Error(`Erreur lors de la suppression du Top 5 : ${err.message}`);
        }
    }


    // Modifier le Top 5 Officiel du mois
    static async createofficialLineup() {
        try {
            
        } catch (err) {
        throw new Error(`Erreur lors de la creation du Top 5 ${err.message}`);
        }
    }



    // Récupérer tous Top 5 officiel d'un mois souhaité
    static async getOfficialLineupsByMonthId (monthId) {
        try {
            const month = await Month.findByPk(monthId);

            if (!month) {
                throw new Error (`Mois ${monthId} non trouvé`);   
            }      

        const officialLineup = await OfficialLineup.findOne({
            where: { month_id: monthId },
            include: [{ model: MonthlyPlayer, through: { attributes: [] } }],
        });

        if (officialLineup.length === 0) {
        throw new Error("Aucun Top 5 Officiel trouvé pour le mois choisi");    
        }

        return officialLineup;

        } catch (err) {
        throw new Error(
            `Erreur lors de la récupération des Top 5 ${err.message}`,
        );
        }
    }
}

module.exports = officialLineupService;
