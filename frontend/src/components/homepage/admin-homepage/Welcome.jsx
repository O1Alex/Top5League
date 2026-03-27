import { memo } from 'react'

const Welcome = memo(() => {
    return (
        <section className='welcome-section py-4 mb-5'>
            <div className="welcome row ">
                <p className='welcome-text d-flex justify-content-center text-center mt-2 mb-4'>
                    Bienvenue sur le tableau de bord Admin  Top 5 League ! <br />
                    Ici, gérez les challenges, les joueurs du mois, les résultats ou encore les utilisateurs en toute simplicité ! 
                </p>
            </div>
        </section>
    )
});

export default Welcome;
