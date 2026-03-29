import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PlayerCard from '../OfficialPlayerCard';

const Top20= memo(()=>  {

    const [players, setPlayers]= useState([]);

    useEffect(()=> {
         const fetchPlayer = async () => {
            try {
                const { data } = await api.get(`/monthlyPlayers/current`);
                setPlayers(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPlayer();
    }, []);

    const pgPlayers = players.filter(player => player.position === "PG");
    
    return (
        // Section apercu Top 20 mois
        <section className="top-20 mt-3 mb-4 p-4">
            
            <div className="div-title-top d-flex justify-content-center mb-5">
                <h2 className="title-part">Top 20 du mois</h2>
            </div>

            {/* Card */}
            <div  className="top-card row justify-content-center g-2 mt-4">
                {pgPlayers.map(player => (
                    <PlayerCard key={player.id} player={player}/>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-5">
                <Link to="/monthlyplayers" className="btn t5l-btn-blue">Accéder au Top 20 complet</Link>
            </div>

        </section>
    )
});

export default Top20;
