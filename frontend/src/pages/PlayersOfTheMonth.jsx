import { memo, useState, useEffect } from 'react';

const PlayersOfTheMonth = memo(() => {

    const [players, setPlayers]= useState([]);
    
        useEffect(()=> {
            fetch("http://localhost:3000/api/monthlyplayers/current")
                .then(res => res.json())
                .then(data => setPlayers(data))
                .catch(err => console.log(err));
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
            <h1 className="page-title">Les joueurs du mois par poste</h1>
        </div>

        <section className="top-position my-5 p-4">
            <div className="div-title-top d-flex mb-5">
                <h3 className="title-part">Les meneurs (PG):</h3>
            </div>

            <div className="top-card row justify-content-center mt-4">

                {/* Les meneurs (PG) */}
                {pgPlayers.map(player => (
                    <div key={player.id} className="col-12 col-md-3 d-flex justify-content-center">
                        <div className="card card-player">
                            <img src={player.image} alt={player.fullname} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{player.fullname}</h5>
                                <div>
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
                    </div>
                ))}

                {/* Les arrières (SG) */}
                {sgPlayers.map(player => (
                    <div key={player.id} className="col-12 col-md-3 d-flex justify-content-center">
                        <div className="card card-player">
                            <img src={player.image} alt={player.fullname} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{player.fullname}</h5>
                                <div>
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
                    </div>
                ))}
                    
                {/* Les ailier (SF) */}
                {sfPlayers.map(player => (
                    <div key={player.id} className="col-12 col-md-3 d-flex justify-content-center">
                        <div className="card card-player">
                            <img src={player.image} alt={player.fullname} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{player.fullname}</h5>
                                <div>
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
                    </div>
                ))}
                    
                {/* Les ailiers fort (PF) */}
                {pfPlayers.map(player => (
                    <div key={player.id} className="col-12 col-md-3 d-flex justify-content-center">
                        <div className="card card-player">
                            <img src={player.image} alt={player.fullname} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{player.fullname}</h5>
                                <div>
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
                    </div>
                ))}

                {/* Les interieurs (C) */}
                {cPlayers.map(player => (
                    <div key={player.id} className="col-12 col-md-3 d-flex justify-content-center">
                        <div className="card card-player">
                            <img src={player.image} alt={player.fullname} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{player.fullname}</h5>
                                <div>
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
                    </div>
                ))}

            </div>
                

        </section>

    </main>


    )
});

export default PlayersOfTheMonth;
