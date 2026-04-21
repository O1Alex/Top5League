import{ useEffect, useState } from 'react';
import api from '../../../services/api';
import PredictedPlayerCard from '../../player-cards/PredictedPlayerCard';
import sortPlayersByPosition  from '../../../utils/sortPlayers';

const MonthWinner = () => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const sortedPlayers = sortPlayersByPosition(players);

    useEffect(() => {
        const fetchWinnerLineup = async () => {
            try {
                const { data } = await api.get("/winner/lineup");
                setPlayers(data.data.MonthlyPlayers);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWinnerLineup();
    }, []);

    if (loading) {
        return <p>Chargement du gagnant...</p>;
    }
    
    return (
        <div className="row justify-content-center g-4 mt-3">
            {players.length === 0 ? (
                <p>Aucun joueur trouvé</p>
            ) : (
                sortedPlayers.map((player) => (
                    <PredictedPlayerCard key={player.id} player={player} />
                ))
            )}
        </div>
    );
};


export default MonthWinner;
