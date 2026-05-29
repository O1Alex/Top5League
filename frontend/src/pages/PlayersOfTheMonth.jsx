import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import OfficialPlayerCard from '../components/player-cards/OfficialPlayerCard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProviders';


const PlayersOfTheMonth = () => {

    const [players, setPlayers]= useState([]);
    const [monthId, setMonthId] = useState(null);
    
        useEffect(()=> {
            const fetchPlayer = async () => {
                try {
                    const { data } = await api.get(`/monthlyPlayers/current`);

                    console.log("API response:", data);

                    setPlayers(data.data);
                    setMonthId(data.monthId);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchPlayer();
        }, []);

        const sortedPlayers = [...players].sort((a, b) => a.fullname.localeCompare(b.fullname));
            
        const pgPlayers = sortedPlayers.filter(player => player.position === "PG");
        const sgPlayers = sortedPlayers.filter(player => player.position === "SG");
        const sfPlayers = sortedPlayers.filter(player => player.position === "SF");
        const pfPlayers = sortedPlayers.filter(player => player.position === "PF");
        const cPlayers = sortedPlayers.filter(player => player.position === "C");

        const { user, loading } = useContext(AuthContext);

    return (
      
  
    <main className="container py-5">
        
      {/* Titre */}
        <div className=" title d-flex justify-content-center mb-5">
            <h2 className="page-title">Les joueurs du mois par poste</h2>
        </div>

        <section className="top-position mt-5 p-4">

            <div className='players-position px-5 py-4 mb-5'>
                <div className="div-title-top d-flex mb-5">
                    <h4 className="title-part">Les meneurs (PG):</h4>
                </div>

                <div className="top-card row justify-content-center mb-5">

                    {/* Les meneurs (PG) */}
                    {pgPlayers.map(player => (
                        <div key={player.id} className="col-12 col-sm-6 col-lg-3">
                            <OfficialPlayerCard player={player} />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='players-position px-5 py-4 mb-5'>
                <div className="div-title-top d-flex mb-5">
                    <h4 className="title-part">Les arrières (SG):</h4>
                </div>

                <div className="top-card row justify-content-center mb-5">

                    {/* Les arrières (SG) */}
                    {sgPlayers.map(player => (
                        <div key={player.id} className="col-12 col-sm-6 col-lg-3">
                            <OfficialPlayerCard player={player} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='players-position px-5 py-4 mb-5'>
                <div className="div-title-top d-flex mb-5">
                    <h4 className="title-part">Les ailliers (SF):</h4>
                </div>

                <div className="top-card row justify-content-center mb-5">

                    {/* Les ailier (SF) */}
                    {sfPlayers.map(player => (
                        <div key={player.id} className="col-12 col-sm-6 col-lg-3">
                            <OfficialPlayerCard player={player} />
                        </div>
                    ))}
                </div>
            </div>
        
            <div className='players-position px-5 py-4 mb-5'>
                <div className="div-title-top d-flex mb-5">
                    <h4 className="title-part">Les ailliers forts (PF):</h4>
                </div>

                <div className="top-card row justify-content-center mb-5">
                    {/* Les ailiers forts (PF) */}
                    {pfPlayers.map(player => (
                        <div key={player.id} className="col-12 col-sm-6 col-lg-3">
                            <OfficialPlayerCard player={player} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='players-position px-5 py-4 mb-5'>
                <div className="div-title-top d-flex mb-5">
                    <h4 className="title-part">Les interieurs (C):</h4>
                </div>

                <div className="top-card row justify-content-center mb-5">
                    {/* Les interieurs (C) */}
                    {cPlayers.map(player => (
                        <div key={player.id} className="col-12 col-sm-6 col-lg-3">
                            <OfficialPlayerCard player={player} />
                        </div>
                    ))}
                </div>
            </div>

        
            {!loading && user?.role === "admin" && monthId && (
                <div className="d-flex justify-content-center mt-5">
                    <Link to={`/createplayer/${monthId}`} className="btn t5l-btn-blue">
                        Créer un nouveau joueur
                    </Link>
                </div>
            )}

        </section>

    </main>


    )
};

export default PlayersOfTheMonth;
