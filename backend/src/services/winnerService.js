const Month = require("../models/Month");
const OfficialLineup = require("../models/OfficialLineup");
const OfficialLineupPlayer = require("../models/OfficialLineupPlayer");
const MonthlyPlayer = require("../models/MonthlyPlayer");
const Lineup = require("../models/Lineup");
const LineupPlayer = require("../models/LineupPlayer");
const { sequelize } = require("../config/database");
const { Op, where } = require("sequelize");
const { Winner } = require("../models/Winner");

class winnerService {

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
}

module.exports = winnerService;
