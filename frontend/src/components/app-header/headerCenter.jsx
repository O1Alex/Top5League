import { memo } from 'react';
import { user } from '../../context/AuthProviders';
import { Link } from 'react-router-dom';

const HeaderCenter = memo(() => {
    return (
        <div className="collapse navbar-collapse" id="t5lNavbar">

            {/* Liens visiteurs */}
            {!user && (
                <ul className="navbar-nav mx-auto gap-lg-4 text-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Résultats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Les joueurs du mois</Link>
                    </li>
                </ul>
            )}

            {/* Liens utilisateurs connecté */}
            {user && user.role==="user"&&(
                <ul className="navbar-nav mx-auto gap-lg-4 text-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Résultats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Les joueurs du mois</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Mon Top 5</Link>
                    </li>
                </ul>
            )}

            {/* Liens Admin */}
            {user && user.role==="admin"&&(
                <ul className="navbar-nav mx-auto gap-lg-4 text-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Utilisateur</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Résultats</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Gérer les joueurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Challenge en cours</Link>
                    </li>
                </ul>
            )}

        </div>
    );
});

export default HeaderCenter;