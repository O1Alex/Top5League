import { memo } from 'react';
import { Link } from 'react-router-dom';

const Register= memo(() => {

    //  Faire la partie stockage info 
    
    return (
        <div className="bg-top5">
            <main className="container py-5">             

                {/* Card */}
                <div className="player-card mx-auto p-4">
                    <form>

                        <div className=" card-title d-flex justify-content-center mb-5">
                            <h1 className="page-title">Inscription</h1>
                        </div>

                        <div className="username mb-3">
                            <label htmlFor="username" className="form-label fw-semibold">Pseudo :</label>
                            <input type="text" id="username" className="form-control top5-input" required/>
                        </div>

                        <div className="favorite_player mb-3">
                            <label htmlFor="favorite_player" className="form-label fw-semibold">Joueur préféré :</label>
                            <input type="text" id="favorite_player" className="form-control top5-input"/>
                        </div>

                        <div className="email mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email :</label>
                            <input type="email" id="email" className="form-control top5-input" required/>
                        </div>

                        <div className="password mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Mot de passe :</label>
                            <input type="password" id="password" className="form-control top5-input" required/>
                        </div>

                        {/* Bouton de création du compte */}
                        <button type="submit" className="btn btn-top5 w-100"> S'inscrire </button>

                    </form>
                     <p className='text-center mt-2'> 
                        Cliquez <Link to="/register">ici</Link>si vous avez déjà un compte.
                    </p>
                </div>
            </main>
        </div>
    )
});

export default Register;
