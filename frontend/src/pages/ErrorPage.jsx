import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='error d-flex flex-column justify-content-center align-items-center text-center '>
            <img src="Erreur-404.png" alt="Erreur 404" width={800}/> 
            
            <div className="d-flex justify-content-center my-5">
                    <Link to="/" className="btn t5l-btn-blue">Retourner vers l'Accueil</Link>
            </div>
        </div>
    )
};

export default ErrorPage;