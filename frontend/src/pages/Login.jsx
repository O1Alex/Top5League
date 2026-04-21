import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProviders';


const Login= () => {

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
   
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);

            navigate("/");

        } catch (error) {
            console.error("Erreur login :", error);
            alert("Email ou mot de passe incorrect");
        }
    };
    
    return (
        <main className="container py-5">                

            {/* Card */}
            <div className="access-card mx-auto p-4 my-5">
                <form onSubmit={handleSubmit}>

                    <div className=" title d-flex justify-content-center mb-4">
                        <h3 className="access-card-title">Connexion</h3>
                    </div>

                    <div className="access-content email mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email :</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control top5-input" required/>
                    </div>

                    
                    <div className="access-content password mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Mot de passe :</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control top5-input" required/>
                    </div>

                    {/* Bouton de connexion */}
                    <button type="submit" className="btn t5l-btn-blue w-100 mt-3"> Se connecter </button>

                </form>
                <p className='redirection text-center'> 
                    Cliquez <Link to="/register">ici</Link> si vous n'avez pas encore de compte.
                </p>
            </div>
        </main>

    )
};

export default Login;
