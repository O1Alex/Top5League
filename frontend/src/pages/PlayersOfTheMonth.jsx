import { memo, useState, useEffect } from 'react';
import api from '../services/api';
import PlayerCard from '../components/PlayerCard';

const PlayersOfTheMonth = memo(() => {

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
        const sgPlayers = players.filter(player => player.position === "SG");
        const sfPlayers = players.filter(player => player.position === "SF");
        const pfPlayers = players.filter(player => player.position === "PF");
        const cPlayers = players.filter(player => player.position === "C");

    return (
      
  
    <main className="container py-5">
        
      {/* Titre */}
        <div className=" title d-flex justify-content-center mb-5">
            <h2 className="page-title">Les joueurs du mois par poste</h2>
        </div>

        <section className="top-position my-5 p-4">
            <div className="div-title-top d-flex mb-5">
                <h4 className="title-part">Les meneurs (PG):</h4>
            </div>

            <div className="top-card row justify-content-center mb-5">

                {/* Les meneurs (PG) */}
                {pgPlayers.map(player => (
                    <PlayerCard key={player.id} player={player}/>
                ))}
            </div>
            
            <div className="div-title-top d-flex mb-4">
                <h4 className="title-part">Les arrières (SG):</h4>
            </div>

            <div className="top-card row justify-content-center mb-5">

                {/* Les arrières (SG) */}
                {sgPlayers.map(player => (
                    <PlayerCard key={player.id} player={player}/>
                ))}
            </div>

            <div className="div-title-top d-flex mb-4">
                <h4 className="title-part">Les ailliers (SF):</h4>
            </div>

            <div className="top-card row justify-content-center mb-5">

                {/* Les ailier (SF) */}
                {sfPlayers.map(player => (
                    <PlayerCard key={player.id} player={player}/>
                ))}
            </div>
        
            <div className="div-title-top d-flex mb-4">
                <h4 className="title-part">Les ailliers forts (PF):</h4>
            </div>

            <div className="top-card row justify-content-center mb-5">
                {/* Les ailiers forts (PF) */}
                {pfPlayers.map(player => (
                    <PlayerCard key={player.id} player={player}/>
                ))}
            </div>

            <div className="div-title-top d-flex mb-4">
                <h4 className="title-part">Les interieurs (C):</h4>
            </div>

            <div className="top-card row justify-content-center mb-5">
                {/* Les interieurs (C) */}
                {cPlayers.map(player => (
                    <PlayerCard key={player.id} player={player}/>
                ))}
            </div>

        </section>

    </main>


    )
});

export default PlayersOfTheMonth;
