import { memo, useContext } from 'react';
import { AuthContext } from '../../context/AuthProviders';
import { Link, useNavigate } from 'react-router-dom';

const HeaderRight = memo(() => {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout() 
        navigate("/login");
    };

    return (
        <div className='connexion'>
            {!user ? (
                <div className="d-flex gap-2 justify-content-center">
                    <Link to="/login" className="btn t5l-btn-blue">Connexion</Link>
                    <Link to="/register" className="btn t5l-btn-orange">Inscription</Link>
                </div>
            ) : (
                <div className="d-flex gap-3 justify-content-center align-items-center">
                    <p className='header-text mb-0'>Bonjour {user.username} !</p>
                    <button onClick={handleLogout} className="btn t5l-btn-blue">Deconnexion</button>
                </div>
            )}
        </div>
    );
});

export default HeaderRight;