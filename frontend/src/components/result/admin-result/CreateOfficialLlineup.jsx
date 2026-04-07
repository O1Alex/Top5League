import { memo, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthProviders';


const positions = [
    { key: "SF", label: "Ailier (SF)" },
    { key: "PG", label: "Meneur (PG)" },
    { key: "SG", label: "Arrière (SG)" },
    { key: "PF", label: "Ailier Fort (PF)" },
    { key: "C", label: "Pivot (C)" },
];

const CreateOfficialLlineup = memo(() => {

    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const [players, setPlayers] = useState(
        positions.map((p) => ({
            position: p.key,
            fullname: "",
            pts: "",
            ast: "",
            reb: "",
        }))
    );
    const [playersName, setPlayersName] = useState([]);

  // Protection accès au formulaire de création du Top 5
  useEffect(() => {
    if (!loading && user?.role !== "admin") navigate("/");
  }, [user, loading, navigate]);

  // Update d’un champ
  const handleChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  // Envoi du top 5
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await api.post("/officialLineup", { players });
        alert("Top 5 créé !");
        navigate("/mychallenge");
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <section className='create-officiail-lineup'>
            <div className=" title d-flex justify-content-center mb-5">
                <h2 className="page-title mb-4">Les Résultats</h2>
            </div>

            <div className='intro-text-admin text-center mb-4'>
                <p>
                    Bienvenue sur la page des Résultats ! <br/>
                    Ici, vous pourrez entrer le Top 5 de référence chaque mois et lancer la recherche du gagnant en cliquant sur le bouton dédié. 
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                
                {/* Titre */}
                <div className="d-flex justify-content-center mb-5">
                <h1 className="page-title mb-5">Création Top 5</h1>
                </div>

                {/* Formulaire de création */}
                <div className="form-lineup-card row g-5 d-flex justify-content-center mt-5 px-5">

                    {players.map((player, index) => (
                        <div key={player.position} className="col-md-6 col-lg-4">
                            <div className="lineup-form p-3 h-100">

                                <h4 className="form-title-part text-center mb-1"> {positions[index].label} </h4>
                                <br />

                                {/* Joueur */}
                                <label htmlFor="fullname" className="form-label fw-semibold mt-0">Nom du joueur :</label>
                                <select className="form-control" value={player.fullname}
                                    onChange={(e) =>
                                        handleChange(index, "fullname", e.target.value)
                                    }
                                >
                                {playersName
                                    .filter(p => p.position === player.position)
                                    .map(p => (
                                        <option value="#">Sélectionner un joueur</option>,
                                    <option key={p.id} value={p.fullname}> {p.fullname} </option>
                                    ))}
                                </select>


                                {/* PPG */}
                                <label htmlFor="pts" className="form-label fw-semibold mt-2">Points par match (PPG) :</label>
                                <input className="form-control mb-2" type="number" step="0.1" placeholder="20.0" value={player.predicted_pts}
                                    onChange={(e) =>
                                        handleChange(index, "pts", e.target.value)
                                    } required
                                />

                                {/* APG */}
                                <label htmlFor="ast" className="form-label fw-semibold mt-2">Passe décisive par match (APG) :</label>
                                <input type="number" step="0.1" placeholder="5.2" className="form-control mb-2" value={player.predicted_ast}
                                    onChange={(e) =>
                                        handleChange(index, "_ast", e.target.value)
                                    } required
                                />

                                {/* RPG */}
                                <label htmlFor="reb" className="form-label fw-semibold mt-2">Rebonds par match (PPG) :</label>
                                <input type="number" step="0.1" placeholder="10.3" className="form-control" value={player.predicted_reb}
                                    onChange={(e) =>
                                        handleChange(index, "reb", e.target.value)
                                    } required
                                />

                            </div>
                        </div>
                    ))}

                    {/* Bouton */}
                    <div className="text-center m-5">
                        <button type="submit" className="btn t5l-btn-blue px-5">
                            Créer mon Top 5
                        </button>
                    </div>

                </div>
            </form>
        </section>
    )
});

export default CreateOfficialLlineup;
