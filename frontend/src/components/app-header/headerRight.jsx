import { memo, useContext } from 'react';
import { AuthContext } from '../../context/AuthProviders';
import { Link } from 'react-router-dom';

const HeaderRight = memo(() => {

    const { user } = useContext(AuthContext);

    return (
        <div className='connexion'>
            {!user ? (
                <div className="d-flex gap-2 justify-content-center">
                    <Link to="/login" className="btn t5l-btn-blue">Connexion</Link>
                    <Link to="/register" className="btn t5l-btn-orange">Inscription</Link>
                </div>
            ) : (
                <div className="d-flex gap-2 justify-content-center">
                    <p>Bonjour {user.username} !</p>
                    <Link to="/Deconnexion" className="btn t5l-btn-blue">Deconnexion</Link>
                </div>
            )}
        </div>
    );
});

export default HeaderRight;