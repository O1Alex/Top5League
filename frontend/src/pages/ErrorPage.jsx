import { memo } from 'react'

const ErrorPage = memo(() => {
    return (
        <div className='erreur '>
           <img src="Erreur 404.png" alt="Erreur 404" width={400}/> 
           <p>Oops ! Cette page est introuvable.</p>
        </div>
    )
});

export default ErrorPage;
