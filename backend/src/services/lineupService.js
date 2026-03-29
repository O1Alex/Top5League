const Month = require("../models/Month");
const Lineup = require("../models/Lineup");
const { Op } = require("sequelize");
const MonthlyPlayer = require("../models/MonthlyPlayer");
const LineupPlayer = require("../models/LineupPlayer");
const  sequelize  = require("../config/database");
const monthService = require("../services/monthService");



class lineupService {
    static async getActiveMonth() {
        const month = await Month.findOne({
            where: { status: "open" },
            order: [["start_date", "DESC"]],
        });

        if (!month) {
            throw new Error("Aucun challenge n'est actuellement ouvert");
        }
        return month;
    }


    // Créer son lineup du mois
    static async createLineup(user_id, lineupData) {
        try {
            const positions = ["PG", "SG", "SF", "PF", "C"];

            // Récupération du mois ouvert
            const month = await this.getActiveMonth();
            const month_id = month.id;
            
            // controle 1 seul lineup dans le mois
            const existing = await Lineup.findOne({
                where: { user_id, month_id },
            });

            if (existing) {
                throw new Error("Un Top 5 existe déjà pour ce mois");
            }

            // Vérification joueurs appartiennent au mois et exactement 5 joueurs
            const monthlyPlayers = await MonthlyPlayer.findAll({
                where: {
                    id: { [Op.in]: lineupData.map((p) => p.playerId) },
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
                const hasPos = lineupData.some(
                    (p) => positionMap.get(p.playerId) === pos);
                if (!hasPos) {
                throw new Error(`Le joueur pour la position ${pos} est manquant`);
                }
            });


            return sequelize.transaction(async (t) => {
                
                const newLineup = await Lineup.create(
                    { user_id, month_id },
                    { transaction: t }
                );
                
                await LineupPlayer.bulkCreate(
                    lineupData.map((p) => ({
                        lineup_id: newLineup.id,
                        monthly_player_id: p.playerId,
                        predicted_pts: p.predicted_pts ?? 0,
                        predicted_ast: p.predicted_ast ?? 0,
                        predicted_reb: p.predicted_reb ?? 0,
                    })),
                    { transaction: t }
                );

                return Lineup.findByPk(newLineup.id, {
                    include: [{ model: MonthlyPlayer, through: { attributes: ["predicted_pts", "predicted_ast", "predicted_reb"] } }], 
                    transaction: t,
                });
            });
            
        } catch (err) {
        throw new Error(`Erreur lors de la creation du Top 5 ${err.message}`);
        }
    }


    // Récupérer son lineup du mois
    static async getMyLineup(user_id) {
        try {
            const month = await monthService.getCurrentMonth();
            const month_id = month.id;

            const lineup = await Lineup.findOne({
                where: { month_id, user_id },
                include: [{ model: MonthlyPlayer, through: { attributes: ["predicted_pts", "predicted_ast", "predicted_reb"] } }],
            });

        if (!lineup) {
            return null;    
        }

        return lineup;

        } catch (err) {
            throw new Error(
                `Erreur lors de la récupération du Top 5 ${err.message}`,
            );
        }
    }


    // Récupérer tous les lineups d'un mois souhaité
    static async getLineupsByMonthId (monthId) {
        try {
            const month = await Month.findByPk(monthId);

            if (!month) {
                return null;   
            }      

        const lineups = await Lineup.findAll({
            where: { month_id: monthId },
            include: [{ model: MonthlyPlayer, through: {  attributes: ["predicted_pts", "predicted_ast", "predicted_reb"] } }],
        });

        return lineups;

        } catch (err) {
        throw new Error(
            `Erreur lors de la récupération des Top 5 ${err.message}`,
        );
        }
    }


    // Modifier son lineup du mois
    static async updateMyLineup(user_id, lineupData) {
        try {
            const positions = ["PG", "SG", "SF", "PF", "C"];

            // Récupération du mois ouvert
            const month = await this.getActiveMonth();
            const month_id = month.id;

            // Récupération du lineup de l'utilisateur pour ce mois
            const lineup = await Lineup.findOne({
            where: { user_id, month_id },
            });

            if (!lineup) {
                return null;
            }

            // Vérification appartenance des joueurs au mois et nombre de joueur = 5
            const monthlyPlayers = await MonthlyPlayer.findAll({
                where: {
                    id: { [Op.in]: lineupData.map(p => p.playerId) },
                    month_id,
                },
            });

            if (monthlyPlayers.length !== 5) {
                throw new Error("Certains joueurs sont invalides pour le mois en cours");
            }

            // Vérification 1 joueur par poste
            const positionMap = new Map();
            monthlyPlayers.forEach(player => {
                positionMap.set(player.id, player.position);
            });

            positions.forEach(pos => {
                const hasPos = lineupData.some(
                    p => positionMap.get(p.playerId) === pos
                );
                if (!hasPos) {
                    throw new Error(`Le joueur pour la position ${pos} est manquant`);
                }
            });

            // Transaction : reset + recréation
            return sequelize.transaction(async (t) => {

                // Suppression des anciens picks
                await LineupPlayer.destroy({
                    where: { lineup_id: lineup.id },
                    transaction: t,
                });

                // Création des nouveaux picks
                await LineupPlayer.bulkCreate(
                    lineupData.map(p => ({
                    lineup_id: lineup.id,
                    monthly_player_id: p.playerId,
                    predicted_pts: p.predicted_pts ?? 0,
                    predicted_ast: p.predicted_ast ?? 0,
                    predicted_reb: p.predicted_reb ?? 0,
                    })),
                    { transaction: t }
                );

                // Retour du lineup mis à jour
                return Lineup.findByPk(lineup.id, {
                    include: [
                    {
                        model: MonthlyPlayer,
                        through: {
                        attributes: ["predicted_pts", "predicted_ast", "predicted_reb"],
                        },
                    },
                    ],
                    transaction: t,
                });
            });

        } catch (err) {
            throw new Error(`Erreur lors de la modification du Top 5 ${err.message}`);
        }
    }


    // Supprimer son lineup du mois 
    static async deleteMyLineup(user_id) {
        try {
            const month = await this.getActiveMonth();
            const month_id = month.id;
            
            const lineup = await Lineup.findOne({
                where: { month_id, user_id },
            });

            if (!lineup) {
                return null;
            }
            
            await lineup.destroy();
            return true;

        } catch (err) {
        throw new Error(`Erreur lors de la suppression de ton Top 5 ${err.message}`);
        }
    }


    // Supprimer un des lineup (par son ID)
    static async deleteLineupById(id) {
        try {
            const lineup = await Lineup.findByPk(id);

            if (!lineup) {
                return null;
            }

            await lineup.destroy();
            return true;

        } catch (err) {
        throw new Error(`Erreur lors de la suppression du Top 5 : ${err.message}`);
        }
    }

    static async getCurrentLineups() {
        try {
            const month = await monthService.getCurrentMonth();

            if (!month) {
                return [];
            }

            const lineups = await Lineup.findAll({
                where: { month_id: month.id },
            });

            return lineups;

        } catch (err) {
            throw new Error(`Erreur lors de la récupération des lineups du mois ${err.message}`);
        }
    }
}


module.exports = lineupService;
