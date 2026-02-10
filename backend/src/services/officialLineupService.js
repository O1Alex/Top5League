const Month = require("../models/Month");
const OfficialLineup = require("../models/OfficialLineup");
const MonthlyPlayer = require("../models/MonthlyPlayer");
const monthService = require("../services/monthService");
const lineupService = require("./lineupService");
const { Op } = require("sequelize");
const  sequelize  = require("../config/database");
const  OfficialLineupPlayer = require("../models/OfficialLineupPlayer");


class officialLineupService {
    
    // Créer le Top 5 Officiel du mois
    static async createOfficialLineup(officialLineupData) {
        try {
            const positions = ["PG", "SG", "SF", "PF", "C"];
            const month = await lineupService.getActiveMonth();
            const month_id = month.id;
            
            // controle 1 seul lineup dans le mois
            const existing = await OfficialLineup.findOne({
                where: { month_id },
            });

            if (existing) {
                throw new Error("Un Top 5 existe déjà pour ce mois");
            }

            // Vérification joueurs appartiennent au mois et exactement 5 joueurs
            const monthlyPlayers = await MonthlyPlayer.findAll({
                where: {
                    id: { [Op.in]: officialLineupData.map((p) => p.playerId) },
                    month_id,
                },
            });
            
            if (monthlyPlayers.length !== 5) {
                throw new Error(`certains joueurs du mois sont invalides`);
            }

            // Vérification 1 joueur par poste
            const positionMap = new Map();
            monthlyPlayers.forEach((player) => {
                positionMap.set(player.id, player.position);
            });
            
            positions.forEach((pos) => {
                const hasPos = officialLineupData.some(
                    (p) => positionMap.get(p.playerId) === pos);
                if (!hasPos) {
                throw new Error(`Le joueur pour la position ${pos} est manquant`);
                }
            });


            return sequelize.transaction(async (t) => {
                
                const newOfficialLineup = await OfficialLineup.create(
                    { month_id },
                    { transaction: t }
                );
                
                await OfficialLineupPlayer.bulkCreate(
                    officialLineupData.map((p) => ({
                        official_lineup_id: newOfficialLineup.id,
                        monthly_player_id: p.playerId,
                        pts: p.pts ?? 0,
                        ast: p.ast ?? 0,
                        reb: p.reb ?? 0,
                    })),
                    { transaction: t }
                );

                return OfficialLineup.findByPk(newOfficialLineup.id, {
                    include: [{ model: MonthlyPlayer, through: { attributes: ["pts", "ast", "reb"] } }], 
                    transaction: t,
                });
            });
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
                include: [{ model: MonthlyPlayer, through: { attributes: ["predicted_pts", "predicted_ast", "predicted_reb"] } }],
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


    // Récupérer le Top 5 officiel d'un mois souhaité
    static async getOfficialLineupByMonthId(monthId) {
        try {
            const month = await Month.findByPk(monthId);

            if (!month) {
                throw new Error (`Mois ${monthId} non trouvé`);   
            }      

        const officialLineup = await OfficialLineup.findOne({
            where: { month_id: monthId },
            include: [{ model: MonthlyPlayer, through: { attributes: ["pts", "ast", "reb"] } }],
        });

        if (!officialLineup) {
                throw new Error("Aucun Top 5 officiel publié pour le mois en cours");
        }

        return officialLineup;

        } catch (err) {
        throw new Error(
            `Erreur lors de la récupération des Top 5 ${err.message}`,
        );
        }
    }

    
    // Modifier le Top 5 Officiel du mois
    static async updateOfficialLineup(officialLineupData) {
        try {
            const positions = ["PG", "SG", "SF", "PF", "C"];
            const month = await lineupService.getActiveMonth();
            const month_id = month.id;

            // Récupérer le Top 5 Officiel existant
            const officialLineup = await OfficialLineup.findOne({
                where: { month_id },
            });

            if (!officialLineup) {
            throw new Error("Aucun Top 5 Officiel trouvé pour ce mois");
            }

            // Vérification joueurs du mois
            const monthlyPlayers = await MonthlyPlayer.findAll({
                where: {
                    id: { [Op.in]: officialLineupData.map(p => p.playerId) },
                    month_id,
                },
            });

            if (monthlyPlayers.length !== 5) {
                throw new Error("Les joueurs sélectionnés sont invalides");
            }

            // Vérification 1 joueur par poste
            const positionMap = new Map();
            monthlyPlayers.forEach(player => {
                positionMap.set(player.id, player.position);
            });

            positions.forEach(pos => {
                const hasPos = officialLineupData.some(
                    p => positionMap.get(p.playerId) === pos
                );
                if (!hasPos) {
                    throw new Error(`Le joueur pour la position ${pos} est manquant`);
                }
            });

            return sequelize.transaction(async (t) => {

                // Supprimer les anciens joueurs du Top 5 Officiel
                await OfficialLineupPlayer.destroy({
                    where: { official_lineup_id: officialLineup.id },
                    transaction: t,
                });

                // Insérer les nouveaux joueurs
                await OfficialLineupPlayer.bulkCreate(
                    officialLineupData.map(p => ({
                    official_lineup_id: officialLineup.id,
                    monthly_player_id: p.playerId,
                    pts: p.pts ?? 0,
                    ast: p.ast ?? 0,
                    reb: p.reb ?? 0,
                    })),
                    { transaction: t }
                );

                // Retourner le Top 5 Officiel mis à jour
                return OfficialLineup.findByPk(officialLineup.id, {
                    include: [
                    { model: MonthlyPlayer, through: { attributes: ["pts", "ast", "reb"] },},
                    ],
                    transaction: t,
                });
            });

        } catch (err) {
            throw new Error(`Erreur lors de la modification du Top 5 Officiel : ${err.message}`);
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
}

module.exports = officialLineupService;
