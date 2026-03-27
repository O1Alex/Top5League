import { memo, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProviders';

const Challenge= memo(()=>  {

    const [month, setMonth]= useState(null);
    const { user } = useContext(AuthContext);
    

    useEffect(()=> {

        fetch("http://localhost:3000/api/months/current")
            .then(res => res.json())
            .then(data => setMonth(data))
            .catch(err => console.log(err));

    }, []);


    return (
        // Section challenge
        <section className="challenge-section mt-4 p-4">
            <div className="row g-4">

                {/* Mois en cours */}
                < div className="challenge-admin">
                
                    <div className="current-challenge-admin my-2 p-2 d-flex justify-content-center">
                        <h3 className="title-part mb-3 d-flex text-center">Challenge du mois en cours</h3>
                    </div>

                    <div className="challenge-infos-admin d-flex flex-column flex-md-row justify-content-between align-items-center py-3 px-5 my-4 mx-4">
                        <span><strong>Top 20 publié :</strong> <span className="status">{month?.status}</span></span>
                        <span><strong>Participants :</strong> <span className="status"></span></span>
                        <span><strong>Status des votes :</strong> <span className="status">{month?.status}</span></span>
                    </div> 

                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn t5l-btn-orange my-2 mb-3 mt-3">
                            Accéder au challenge
                        </Link>
                    </div>           
                    

                </div>
            </div>
        </section>
    )
});

export default Challenge;
