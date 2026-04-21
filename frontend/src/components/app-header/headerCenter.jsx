import { memo, useContext } from 'react';
import { AuthContext } from '../../context/AuthProviders';
import { Link } from 'react-router-dom';

const HeaderCenter = memo(() => {

    const { user } = useContext(AuthContext);

    return (
        <>
            {/* Liens visiteurs */}
            {!user && (
                <ul className="navbar-nav mx-auto gap-lg-4 text-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/result">Résultats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/monthlyplayers">Les joueurs du mois</Link>
                    </li>
                </ul>
            )}


            {/* Liens utilisateurs connecté */}
            {user && user?.role==="user"&&(
                <ul className="navbar-nav mx-auto gap-lg-4 text-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/result">Résultats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/monthlyplayers">Les joueurs du mois</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mychallenge">Mon Top 5</Link>
                    </li>
                </ul>
            )}

            {/* Liens Admin */}
            {user && user?.role==="admin"&&(
                <ul className="navbar-nav mx-auto gap-lg-4 text-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/userslist">Utilisateurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/result">Résultats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/monthlyplayers">Gérer les joueurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/challengemanagement">Challenge en cours</Link>
                    </li>
                </ul>
            )}

        </>
    );
});

export default HeaderCenter;