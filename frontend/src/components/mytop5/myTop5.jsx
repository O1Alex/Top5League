import { memo } from 'react'
import { Link } from 'react-router-dom';

const MyTop5= memo(() => {
    return (
        <div className='home-top5 d-flex flex-column justify-content-center mb-4'>
            <h2 className='title-top5 mb-5 text-center align-self-center'>Mon Top 5</h2>
            <p className='home-top5-text d-flex justify-content-center text-center mb-5'>
                Bienvenu sur ton Top 5 ! c'est ici que tu vas pouvoir créer en début de mois et consulter par la suite ton top 5. <br />
                Je te laisse cliquer sur le Bouton si dessous une fois que tu auras consulter les joueurs du mois afin de participer au challenge. <br />
                Une fois cela fait, ton top 5 sera disponible sur cette page. 
            </p>
            <div className="d-flex justify-content-center mt-4">
                <Link to="/" className="btn t5l-btn-blue"> Créer mon Top 5 </Link>
            </div>
            

        </div>
    )
});

export default MyTop5;
