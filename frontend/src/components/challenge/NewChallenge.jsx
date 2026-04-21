

const NewChallenge = () => {

    return (
        <section className='new-challenge'>
            <div className='card challenge-card'>

                <div className='card-header'>
                    <h5 className='card-title'>Nouveau Challenge</h5>
                </div>

                <div className='card-body'>
                    <div className='content-card px-2'>
                       <p>Cliquez ici pour générer automatiquement un nouveau challenge lorsque le mois débute :</p>
                    </div>
                    
                    <div className="d-flex justify-content-center mt-4">
                        <div to={"/challengemanagement"}  className="btn t5l-btn-orange ">
                            Débuter le challenge
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
};

export default NewChallenge
