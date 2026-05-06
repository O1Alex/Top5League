import { Link } from "react-router-dom";

const NewChallenge = () => {

    return (
        <section className='new-challenge'>
            <div className='card challenge-card'>

                <div className='card-header'>
                    <h5 className='card-title'>Nouveau Challenge</h5>
                </div>

                <div className='card-body'>
                    <div className='content-card px-2'>
                       <p>Cliquez ici pour créér un nouveau challenge lorsque le résultat du challenge en cours est publié :</p>
                    </div>
                    
                    <div className="d-flex justify-content-center mt-4">
                        <Link to={"/createmonth"}  className="btn t5l-btn-orange ">
                                Débuter un nouveau challenge
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
};

export default NewChallenge
