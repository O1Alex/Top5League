const Month = require("../models/Month");
const OfficialLineup = require("../models/OfficialLineup");
const { MonthlyPlayer, sequelize, officialLineupPlayer } = require("../models");
const { Op } = require("sequelize");

class officialLineupService {

    static async createofficialLineup(officialLineupData) {
        try {
            const positions = ["PG", "SG", "SF", "PF", "C"];
            const month = await Month.findOne({
                where: { status: "open" },
                order: [["start_date", "DESC"]],
            });

            const month_id = month.id;

            const monthlyPlayers = await MonthlyPlayer.findAll({
                where: 
                    {id: { [Op.in]: officialLineupData.map((p) => p.playerId) },
                    month_id },
            });

            if (monthlyPlayers.length !== 5) {
                throw new Error(`certains joueurs du mois sont invalides`);
            }

            const positionMap = new Map();

            monthlyPlayers.forEach((player) => {
                positionMap.set(player.id, player.position);
            });

            positions.forEach((pos) => {
                const hasPos = officialLineupData.some((p) => positionMap.get(p.playerId) === pos);

                if (!hasPos) {
                throw new Error(`Le joueur pour la position ${pos} est manquant`);
                }
            });


            return sequelize.transaction(async (t) => {
                const newofficialLineup = await OfficialLineup.create(
                { user_id: userId, month_id }, 
                { transaction: t },
                );

                await officialLineupPlayer.bulkCreate(
                officialLineupData.map((p) => ({
                    officialLineup_id: newofficialLineup.id,
                    monthly_player_id: p.playerId,
                })),
                { transaction: t },
                );

            return officialLineup.findByPk(newofficialLineup.id, {
            include: [officialLineupPlayer, MonthlyPlayer],
            });
            });
        } catch (err) {
        throw new Error(`Erreur lors de la creation du Top 5 ${err.message}`);
        }
    }

  // Récupérer les joueurs du mois dans un mois précis (par l'ID du mois)
  static async getMyofficialLineup() {
    try {
      

      if (!month) {
        throw new Error(`Mois ${monthId} non trouvé`);
      }

      const officialLineup = officialLineup.findAll({
        where: { month_id: monthId },
      });

      return officialLineup;
    } catch (err) {
      throw new Error(
        `Erreur lors de la récupération des Top 5 ${err.message}`,
      );
    }
  }

  // Récupérer SON Top 5 du mois dans un mois précis (par l'ID du mois)

  // Supprimer un des Top 5 (par son ID)
  static async deleteofficialLineupById(id) {
    try {
      const officialLineup = await officialLineup.findByPk(id);

      if (!officialLineup) {
        throw new Error(`Top 5 ${id} non trouvé`);
      }

      await officialLineup.destroy();
      return;
    } catch (err) {
      throw new Error(`Erreur lors de la suppression du Top 5 ${err.message}`);
    }
  }
}

module.exports = officialLineupService;
