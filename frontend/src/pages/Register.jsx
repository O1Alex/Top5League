import { memo, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProviders';

const Register= memo(() => {

    const [username, setUsername] = useState ('');
    const [favorite_player, setFavoritePlayer] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    const { register } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(username, email, password, favorite_player);

            navigate("/");

        } catch (error) {
            console.error("Erreur register :", error);
            alert("Erreur lors de l'inscription");
        }
    };
    
    return (
        <div className="bg-top5">
            <main className="container py-5">             

                {/* Card */}
                <div className="access-card mx-auto my-5 p-3">
                    <form onSubmit={handleSubmit}>

                        <div className="access-title d-flex justify-content-center mb-4">
                            <h3 className="access-card-title">Inscription</h3>
                        </div>

                        <div className="access-content username mb-3">
                            <label htmlFor="username" className="form-label fw-semibold">Pseudo :</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control top5-input" required/>
                        </div>

                         <div className="access-content email mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email :</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control top5-input" required/>
                        </div>

                        <div className="access-content password mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Mot de passe :</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control top5-input" required/>
                        </div>

                        <div className="access-content favorite_player mb-3">
                            <label htmlFor="favorite_player" className="form-label fw-semibold">Joueur préféré :</label>
                            <input type="text" id="favorite_player" value={favorite_player} onChange={(e) => setFavoritePlayer(e.target.value)} className="form-control top5-input"/>
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
