const Month = require("../models/Month")
const MonthlyPlayer = require("../models/MonthlyPlayer");

class monthlyPlayerService {

    // Créer un nouveau joueur du mois dans un mois précis (par l'ID du mois)
    static async createMonthlyPlayerByMonthId(monthId, monthlyPlayerData){
        try{
            const month = await Month.findByPk(monthId);

            if (!month) {
                throw new Error (`Mois ${monthId} non trouvé`);   
            }      
            if(month.status !== 'open') {     
                throw new Error (`Impossible de créer un joueur lorsque le mois n'est pas ouvert`);
            }

            const count = await MonthlyPlayer.count({where: {month_id: monthId}})
                if (count >= 20) {
                    throw new Error(
                        `Le nombre maximum de joueur du mois (20) a été atteint pour le mois ${monthId}`
                    );
                }
            
            return MonthlyPlayer.create({...monthlyPlayerData, month_id: monthId});

        } catch (err) {
            throw new Error (`Erreur lors de la creation du mois ${err.message}`);
        }
    }  


    // Récupérer les joueurs du mois dans un mois précis (par l'ID du mois)
    static async getMonthlyPlayersByMonthId(monthId) {
        try{
            const month = await Month.findByPk(monthId);

            if (!month) {
                throw new Error (`Mois ${monthId} non trouvé`);   
            }      
            
            const monthlyPlayer = MonthlyPlayer.findAll({ 
                where:{month_id: monthId}, 
                order:[["position", "ASC"]],
            });

            return monthlyPlayer;

        } catch (err) {
            throw new Error (`Erreur lors de la récupération des joueurs ${err.message}`);
        }
    }  


    // Modifier un des joueurs du mois (par son ID)
    static async updateMonthlyPlayerById(id, monthlyPlayerData){
        try {
            const monthlyPlayer = await MonthlyPlayer.findByPk(id);
            if(!monthlyPlayer){
                throw new Error (`Joueur ${id} non trouvé`);
            }

            await monthlyPlayer.update(monthlyPlayerData);
            return monthlyPlayer;

        } catch (err) {
            throw new Error (`Erreur lors de la modification du joueur ${err.message}`);
        }
    }


    // Supprimer un des joueurs du mois (par son ID)
    static async deleteMonthlyPlayerById(id){
            try {
                const monthlyPlayer = await MonthlyPlayer.findByPk(id);
                
                if(!monthlyPlayer){
                    throw new Error (`Joueur ${id} non trouvé`);
                }

                await MonthlyPlayer.destroy();
                return monthlyPlayer;

            } catch (err) {
                throw new Error (`Erreur lors de la suppression du joueur ${err.message}`);
            }
        }



}


module.exports = monthlyPlayerService;