import { memo } from 'react';
import { Link } from 'react-router-dom';

const Register= memo(() => {

    //  Faire la partie stockage info 
    
    return (
        <div className="bg-top5">
            <main className="container py-5">             

                {/* Card */}
                <div className="access-card mx-auto my-5 p-3">
                    <form>

                        <div className="access-title d-flex justify-content-center mb-4">
                            <h3 className="access-card-title">Inscription</h3>
                        </div>

                        <div className="access-content username mb-3">
                            <label htmlFor="username" className="form-label fw-semibold">Pseudo :</label>
                            <input type="text" id="username" className="form-control top5-input" required/>
                        </div>

                        <div className="access-content favorite_player mb-3">
                            <label htmlFor="favorite_player" className="form-label fw-semibold">Joueur préféré :</label>
                            <input type="text" id="favorite_player" className="form-control top5-input"/>
                        </div>

                        <div className="access-content email mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email :</label>
                            <input type="email" id="email" className="form-control top5-input" required/>
                        </div>

                        <div className="access-content password mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Mot de passe :</label>
                            <input type="password" id="password" className="form-control top5-input" required/>
                        </div>

                        {/* Bouton de création du compte */}
                        <button type="submit" className="btn t5l-btn-blue w-100 mt-3"> S'inscrire </button>

                    </form>
                     <p className='redirection text-center'> 
                        Cliquez <Link to="/login">ici</Link> si vous avez déjà un compte.
                    </p>
                </div>
            </main>
        </div>
    )
});

export default Register;
