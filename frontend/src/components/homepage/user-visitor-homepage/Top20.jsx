import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Top20= memo(()=>  {

    const [players, setPlayers]= useState([]);

    useEffect(()=> {
        fetch("http://localhost:3000/api/monthlyplayers/current")
            .then(res => res.json())
            .then(data => setPlayers(data.data))
            .catch(err => console.log(err));
    }, []);

    const pgPlayers = players.filter(player => player.position === "PG");
    
    return (
        // Section apercu Top 20 mois
        <section className="top-20 my-5 p-4">
            <div className="div-title-top d-flex justify-content-center mb-5">
                <h2 className="title-part">Top 20 du mois</h2>
            </div>

            <div  className="top-card row justify-content-center g-2 mt-4">
          
                {/* Card */}
                {pgPlayers.map(player => (
                    <div key={player.id} className="col-12 col-md-3 d-flex justify-content-center mt-3">
                        <div className="card card-player p-3 text-center">
                            <img src={player.photo_url} alt={player.fullname} className="card-img-top"/>
                            <h5 className="card-title mt-2 mb-1" >{player.fullname}</h5>
                            <div className="card-body pb-0">
                                <div className="d-flex justify-content-between">
                                    <p>Poste : {player.position}</p>
                                    <p>PPG :{player.pts}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>APG : {player.ast}</p>
                                    <p>RPG :{player.reb}</p>
                                </div> 
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            

            <div className="d-flex justify-content-center mt-5">
                <Link to="#" className="btn t5l-btn-blue">Accéder au Top 20 complet</Link>
            </div>
            

        </section>
    )
});

export default Top20;
