import{ useEffect, useState } from 'react';
import api from '../../../services/api';
import PredictedPlayerCard from '../../player-cards/PredictedPlayerCard';
import sortPlayersByPosition from '../../../utils/sortPlayers';

const MyLineup = () => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const sortedPlayers = sortPlayersByPosition(players);

    useEffect(() => {
        const fetchMyLineup = async () => {
            try {
                const { data } = await api.get("/lineups/me/last-month-lineup");
                console.log("Winner lineup:", data.data);
                setPlayers(data.data.MonthlyPlayers);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyLineup();
    }, []);

    if (loading) {
        return <p>Chargement du Top 5...</p>;
    }
    
    return (
        <div className="row justify-content-center g-4 mt-3">
            {players.length === 0 ? (
                <p className='text-center'>Il semblerait que vous n'ayez pas participé au challenge du mois dernier</p>
            ) : (
                sortedPlayers.map((player) => (
                    <PredictedPlayerCard key={player.id} player={player} />
                ))
            )}
        </div>
    );
};


export default MyLineup;
