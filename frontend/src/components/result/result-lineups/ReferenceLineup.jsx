import{ useEffect, useState } from 'react';
import api from '../../../services/api';
import OfficialPlayerCard from '../../player-cards/OfficialPlayerCard';
import sortPlayersByPosition from '../../../utils/sortPlayers';

const ReferenceLineup = () => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const sortedPlayers = sortPlayersByPosition(players);

    useEffect(() => {
        const fetchReferenceLineup = async () => {
            try {
                const { data } = await api.get("/officialLineup/current");
                console.log("Official lineup:", data.data);
                setPlayers(data.data.MonthlyPlayers);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReferenceLineup();
    }, []);

    if (loading) {
        return <p>Chargement du Top 5 Officiel...</p>;
    }
    
    return (
        <div className="row justify-content-center g-4 mt-3">
            {players.length === 0 ? (
                <p>Aucun joueur trouvé</p>
            ) : (
                sortedPlayers.map((player) => (
                    <OfficialPlayerCard key={player.id} player={player} showAdminActions={false}/>
                ))
            )}
        </div>
    );
};

export default ReferenceLineup;
