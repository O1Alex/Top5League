import{ memo, useEffect, useState } from 'react';
import api from '../../../services/api';
import PredictedPlayerCard from '../../player-cards/PredictedPlayerCard';

const MyLineup = memo(() => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyLineup = async () => {
            try {
                const { data } = await api.get("/lineups/me");
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
                <p>Aucun joueur trouvé</p>
            ) : (
                players.map((player) => (
                    <PredictedPlayerCard key={player.id} player={player} />
                ))
            )}
        </div>
    );
});


export default MyLineup;
