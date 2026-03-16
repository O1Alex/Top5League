import { memo, useContext } from 'react';
import { AuthContext } from '../../context/AuthProviders';
import { Link } from 'react-router-dom';

const HeaderRight = memo(() => {

    const { user } = useContext(AuthContext);

    return (
        <div className='Connexion'>
            {!user ? (
                <div class="d-flex gap-2 justify-content-center">
                    <Link to="/Connexion" class="btn t5l-btn-blue">Connexion</Link>
                    <Link to="/Register" class="btn t5l-btn-orange">Inscription</Link>
                </div>
            ) : (
                <div class="d-flex gap-2 justify-content-center">
                    <p>Bonjour {user.username} !</p>
                    <Link to="/Deconnexion" class="btn t5l-btn-blue">Deconnexion</Link>
                </div>
            )}
        </div>
    );
});

export default HeaderRight;