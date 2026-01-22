const Month = require("../models/Month")
const MonthlyPlayer = require("../models/MonthlyPlayer");

class monthlyPlayerService {

    // Créer un joueur du mois
    static async createMonthlyPlayer(monthId, monthData){
        try{
            const month = await Month.findByPk(monthId);
            if (!month) {
                throw new Error (`month ${monthId} non trouvé`);   
            }      
            if(month.status !== 'open') {     
                throw new Error (`Erreur lors de la création du mois ${err.message}`);
            }

            const count = await MonthlyPlayer.count({where: {month_id: monthId}})
                if (count >= 20) {
                    throw new Error(
                        `Le nombre maximum de joueur du mois (20) a été atteint pour le mois ${monthId}`
                    );
                }
            
            return MonthlyPlayer.create({...monthData, month_id: monthId});
            
        } catch (err) {
            throw new Error (`Erreur lors de la creation du mois ${err.message}`);
        }
    }  
}


module.exports = monthlyPlayerService;