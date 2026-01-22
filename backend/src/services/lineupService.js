const Month = require("../models/Month")
const Lineup = require("../models/Lineup");

class lineupService {

    // Créer un nouveau joueur du mois dans un mois précis (par l'ID du mois)
    static async createLineupByMonthId(monthId, lineupData){
        try{
            const month = await Month.findByPk(monthId);

            if (!month) {
                throw new Error (`Mois ${monthId} non trouvé`);   
            }      
            if(month.status !== 'open') {     
                throw new Error (`Impossible de créer le Top 5 lorsque le mois n'est pas ouvert`);
            }
            
            return Lineup.create({...lineupData, month_id: monthId});

        } catch (err) {
            throw new Error (`Erreur lors de la creation du Top 5 ${err.message}`);
        }
    }  


    // Récupérer les joueurs du mois dans un mois précis (par l'ID du mois)
    static async getLineupsByMonthId(monthId) {
        try{
            const month = await Month.findByPk(monthId);

            if (!month) {
                throw new Error (`Mois ${monthId} non trouvé`);   
            }      
            
            const lineup = Lineup.findAll({ 
                where:{month_id: monthId}, 
            });

            return lineup;

        } catch (err) {
            throw new Error (`Erreur lors de la récupération des Top 5 ${err.message}`);
        }
    }  


    // Récupérer SON Top 5 du mois dans un mois précis (par l'ID du mois)
    


    // Supprimer un des Top 5 (par son ID)
    static async deleteLineupById(id){
            try {
                const lineup = await Lineup.findByPk(id);
                
                if(!lineup){
                    throw new Error (`Top 5 ${id} non trouvé`);
                }

                await Lineup.destroy();
                return lineup;

            } catch (err) {
                throw new Error (`Erreur lors de la suppression du Top 5 ${err.message}`);
            }
        }



}


module.exports = lineupService;