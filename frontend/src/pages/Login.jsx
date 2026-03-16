import { memo } from 'react';
import { Link } from 'react-router-dom';


const Login= memo(() => {

    // Fire la partie récupération du mdp et email  + connexion 
    
    return (
        <div className="bg-top5">
            <main className="container py-5">                

                {/* Card */}
                <div className="player-card mx-auto p-4">
                    <form>

                        <div className=" title d-flex justify-content-center mb-5">
                            <h1 className="page-title">Connexion</h1>
                        </div>

                        <div className="email mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email :</label>
                            <input type="email" id="email" className="form-control top5-input" required/>
                        </div>

                        
                        <div className="password mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Mot de passe :</label>
                            <input type="password" id="password" className="form-control top5-input" required/>
                        </div>

                        {/* Bouton de connexion */}
                        <button type="submit" className="btn btn-top5 w-100"> Se connecter </button>

                    </form>
                    <p className='text-center mt-2'> 
                        Cliquez <Link to="/register">ici</Link>si vous n'avez pas encore de compte
                    </p>
                </div>
            </main>
        </div>
    )
});

export default Login;
