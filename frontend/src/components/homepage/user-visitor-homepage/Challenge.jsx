import { memo, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProviders';

const Challenge= memo(()=>  {

    const [winner, setWinner]= useState(null);
    const [month, setMonth]= useState(null);
    const { user} = useContext(AuthContext);
    

    useEffect(()=> {
        fetch("http://localhost:3000/api/winner/current")
            .then(res => res.json())
            .then(data => setWinner(data))
            .catch(err => console.log(err));

        fetch("http://localhost:3000/api/months/current")
            .then(res => res.json())
            .then(data => setMonth(data))
            .catch(err => console.log(err));

    }, []);


    return (
        // Section challenge
        <section className="challenge-section my-5 p-4">
            <div className="row g-4">

                {/* Mois en cours */}
                <div className="col-lg-8">
                    <div className="challenge-left p-4 h-100">

                        <div className="participation my-3 p-3">
                            <h3 className="title-part">Compose ton 5 du mois</h3>
                            <p className="challenge-text py-3">
                                Ça y est c'est le moment ! Lance-toi et crée ton 5 majeur du mois,
                                tu as jusqu'au 5 pour le faire et nous donner les
                                3 statistiques principales de tes joueurs afin de
                                devenir le <span className="highlight">gagnant du TOP5LEAGUE</span>.
                            </p>
                            <div className="button-challenge d-flex justify-content-center">
                                {!user && (
                                    <Link to="/login" className="btn t5l-btn-orange my-2">
                                        Participe au challenge 
                                    </Link>
                                )}

                                {user && user?.role==="user"&&(
                                    <Link to="/" className="btn t5l-btn-orange my-2">
                                        Participe au challenge 
                                    </Link>                                
                                )}
                                 
                            </div>
                        </div>


                        <div className="current-challenge my-3 p-3">
                            <h3 className="title-part mb-3">Challenge du mois en cours</h3>

                            <div className="challenge-infos d-flex flex-column flex-md-row justify-content-between align-items-center p-3 m-3">
                                <span><strong>Top 20 publié :</strong> <span className="status">{month?.status}</span></span>
                                <span><strong>Participants :</strong> <span className="status"></span></span>
                                <span><strong>Votes :</strong> <span className="status">{month?.status}</span></span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bloc gagnant */}
                <div className="col-lg-4">
                    <div className="challenge-right p-4 h-100 text-center">

                        <h3 className="winner-title">Le grand gagnant du mois dernier</h3>

                        <div className="trophy my-3">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 3.125C30.5508 3.125 29.125 4.725 29.125 7C29.125 9.275 30.5508 10.875 32 10.875C33.4492 10.875 34.875 9.275 34.875 7C34.875 4.725 33.4492 3.125 32 3.125ZM19.0061 3.49688L16.9939 4.50313C18.8804 8.27625 23.4151 11.6044 27.2674 13.8084L29.0417 36.875H30.875V24H33.125V36.875H34.9582L36.7326 13.8084C40.5849 11.6044 45.1196 8.27625 47.0061 4.50313L44.9939 3.49688C42.5051 7.23438 39.3825 9.64038 36.0771 10.7181C35.1639 12.16 33.7188 13.125 32 13.125C30.2812 13.125 28.8363 12.16 27.9229 10.718C24.6175 9.6405 21.4949 7.23438 19.0061 3.49688ZM21.125 39.125V51.125H3.125V60.875H60.875V57.125H42.875V39.125H21.125Z" fill="#F4D35B"/>
                            </svg>
                        </div>

                        <p className="winner-text">
                        Ce mois-ci, <strong>{winner?.username}</strong> est le grand gagnant !
                        </p>

                        <p className="winner-text">
                        Voici les 5 joueurs qui lui ont permis de remporter le maillot :
                        </p>

                        {/* <div className="winner-players mt-3">
                        <span>{winner.lineupPlayer.fullname}</span>
                        <span>{winner.lineupPlayer.fullname}</span>
                        <span>{winner.lineupPlayer.fullname}</span>
                        <span>{winner.lineupPlayer.fullname}</span>
                        <span>{winner.lineupPlayer.fullname}</span>
                        </div> */}
                    </div>
                </div>

            </div>
        </section>
    )
});

export default Challenge;
