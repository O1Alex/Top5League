import { memo } from 'react'
import { Link } from 'react-router-dom';
import HeaderRight from '../app-header/headerRight';

const CurrentChallenge = memo(({challenge}) => {

    if (!challenge) return <p>Chargement...</p>;

    const getStatusLabel = (status) => {
        switch (status) {
            case "open":
                return "Ouvert";
            case "closed":
                return "Fermé";
            case "published":
                return "Publié";
            default:
                return "Inconnu";
        }
    };

    return (

        <section className='current-challenge mt-5 mb-5'>
            <div className='row g-4'>

            
            {/* Card Info */}
            <div className='col-12 col-lg-9'>

                <div className='card challenge-card'>

                    <div className='card-header'>
                        <h5 className='card-title'>Challenge en cours</h5>
                    </div>

                    <div className='card-body text-center'>

                        {/* Label du challenge*/}
                        <div className='content-card d-flex flex-column flex-md-row justify-content-md-between px-2 mb-2'>
                            <span>Label :</span>
                            <span className='flash'><strong>{challenge.label}</strong></span>
                        </div>

                        {/* Début du challenge */}
                        <div className='content-card d-flex flex-column flex-md-row justify-content-md-between px-2 mb-2'>
                            <span>Date début participation :</span>
                            <span className='flash'><strong>{" "}{new Date(challenge.start_date).toLocaleString()}</strong></span>
                        </div>

                        {/* Fin du challenge */}
                        <div className='content-card d-flex flex-column flex-md-row justify-content-md-between px-2 mb-2'>
                            <span>Date fin participation :</span>
                            <span className='flash'><strong>{" "}{new Date(challenge.end_date).toLocaleString()}</strong></span>
                        </div>

                        {/* Status du challenge */}
                        <div className='content-card d-flex flex-column flex-md-row justify-content-md-between px-2 mb-2'>
                            <span>Statut:</span>
                            <span className='flash'><strong>{getStatusLabel(challenge.status)}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Actions */}
            <div className='col-12 col-lg-3'>
                <div className='card challenge-card '>
                    <div className='card-header text-center'>
                        <h5 className='card-title'>Actions</h5>
                    </div>

                    <div className='card-body text-center'>
                        <div className="d-flex justify-content-center mt-3">
                            <Link to={"/"}  className="btn t5l-btn-blue ">
                                Modifier les dates
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center mt-3 mb-3" >
                            <Link to={"/"}  className="btn t5l-btn-orange ">
                                Cloturer le challenge
                            </Link>
                        </div>              
                    </div>
                </div>
            </div>
            
            </div>

        </section>

    )
});

export default CurrentChallenge
