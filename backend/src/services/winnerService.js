const Month = require("../models/Month");
const OfficialLineup = require("../models/OfficialLineup");
const OfficialLineupPlayer = require("../models/OfficialLineupPlayer");
const MonthlyPlayer = require("../models/MonthlyPlayer");
const Lineup = require("../models/Lineup");
const LineupPlayer = require("../models/LineupPlayer");
const { sequelize } = require("../config/database");
const { Op, where } = require("sequelize");
const Winner = require("../models/Winner");
const monthService = require("./monthService");
const User = require("../models/User");

class winnerService {

    // Trouver le gagnant
    static async computeWinner(month_id) {

        // Récupération du mois et vérification état
        const month = await Month.findByPk(month_id);
        if (!month) {
            throw new Error("Mois invalide");
        }
        if (month.status !== "closed") {
            throw new Error("Le challenge de ce mois n'est pas encore terminé");
        }

        // Récupération du Top 5 officiel
        const officialLineup = await OfficialLineup.findOne({
            where: { month_id },
            include: [{ model: OfficialLineupPlayer }],
        });
        if (!officialLineup) {
            throw new Error("La lineup officielle n'a pas été définie pour ce mois");
        }

        // Récupération des Id des joueurs du Top 5 Officiel
        const officialPlayerIds = officialLineup.OfficialLineupPlayers.map(
            (p) => p.monthly_player_id,
        );

        // Récupération des statistiques Officiel
        const officialStats = await MonthlyPlayer.findAll({
            where: { id: { [Op.in]: officialPlayerIds } },
        });
        
        const statsMap = new Map();
        
        officialStats.forEach((p) => {
            statsMap.set(p.id, {
                pts: Number(p.pts),
                reb: Number(p.reb),
                ast: Number(p.ast),
            });
        });
        
        // Récupération des Top 5 du mois des joueurs
        const lineups = await Lineup.findAll({
            where: { month_id },
            include: [{ model: LineupPlayer }],
        });
        if (lineups.length === 0) {
            throw new Error("Aucun Top 5 n'a été soumis pour ce mois");
        }

        // Calcul du gagnant du mois 
        const scores = lineups.map((lineup) => {
            let score = 0;
            let statDelta = 0;

            // Comparaison des joueurs Officiel et prédis 
            lineup.LineupPlayers.forEach((lp) => {
            if (officialPlayerIds.includes(lp.monthly_player_id)) {
            score += 1;
            }

            // Comparaison des statistiques prédites et Officiel
            const targetStats = statsMap.get(lp.monthly_player_id);
            if (targetStats) {
            statDelta +=
                Math.abs(lp.pts - targetStats.pts) +
                Math.abs(lp.reb - targetStats.reb) +
                Math.abs(lp.ast - targetStats.ast);
            }
        });
        return { lineup, score, statDelta };
        });

        // Trie des résultat par le score et les statistiques
        scores.sort((a,b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.statDelta - b.statDelta
        });

        // Classement des résultats
        const best = scores[0];
        const [winner, created] = await Winner.findOrCreate({
            where: { month_id },
            defaults:{
                month_id,
                user_id : best.lineup.user_id,
                score: best.score,
            }
        });
        if(!created) {
            await winner.update({
                user_id: best.lineup.user_id,
                score: best.score,
            })
        }
        return winner;
    }


    // Récupérer le gagnant d'un mois précis par l'Id du mois
    static async getWinnerByMonthId(monthId) {
        try {   
            const month = await Month.findByPk(monthId);

            if (!month) {
                    throw new Error (`Mois ${monthId} non trouvé`);   
                }   

            const winner = await Winner.findOne({
                where: { month_id: monthId },
                include: [
                    { model: User,
                    attributes: ["id", "username", "email"]},
                ],
            });

            if (!winner) {
                throw new Error("Aucun gagnant trouvé pour le mois sélectionné");
            }

            return winner;

        } catch (err) {
            throw err;
        }
    }


    // Récupérer le dernier gagnant
    static async getCurrentWinner() {
        try {
            const month = await monthService.getCurrentMonth();

            if (!month) {
            throw new Error("Aucun challenge en cours");
            }

            const winner = await Winner.findOne({
                where: { month_id: month.id },
                include: [
                    { model: User,
                    attributes: ["id", "username", "email", "favorite_player"]},
                ],
            });

            return winner;
            
        } catch (err) {
            throw new Error(`Erreur lors de la récupération du gagnant : ${err.message}`);
        }
    }


    // Récupérer le Top 5 gagnant du mois
    static async getCurrentWinnerLineup() {
        try {
            const month = await monthService.getCurrentMonth();

            if (!month) {
                throw new Error("Aucun challenge en cours");
            }

            const winner = await Winner.findOne({
                where: { month_id : month.id },
            });

            if (!winner) {
                throw new Error("Aucun gagnant publié pour le mois en cours");
            }

            const lineup = await Lineup.findOne({
                where: {
                    month_id: month.id,
                    user_id: winner.user_id,
                },
                include: [
                    { 
                        model: MonthlyPlayer, 
                        through: { attributes: ["predicted_pts", "predicted_ast", "predicted_reb"] },
                    },
                ],
            });

            if (!lineup) {
                throw new Error("Le lineup du gagnant est introuvable");
            }

            return lineup;


        } catch (err) {
             throw new Error(
                `Erreur lors de la récupération du Top  du gagnant ${err.message}`,
            );
        } 
    }
}

module.exports = winnerService;
