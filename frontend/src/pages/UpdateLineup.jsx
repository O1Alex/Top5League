import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthProviders";

const positions = [
    { key: "SF", label: "Ailier (SF)" },
    { key: "PG", label: "Meneur (PG)" },
    { key: "SG", label: "Arrière (SG)" },
    { key: "PF", label: "Ailier Fort (PF)" },
    { key: "C", label: "Pivot (C)" },
];

const UpdateLineup = () => {

    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [players, setPlayers] = useState(
        positions.map(p => ({
            position: p.key,
            playerId: "",
            predicted_pts: "",
            predicted_ast: "",
            predicted_reb: "",
        }))
    );

    const [playersName, setPlayersName] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    // // Protection accès utilisateur
    useEffect(() => {
        if (!loading && user?.role !== "user") navigate("/");
    }, [user, loading, navigate]);

    // Récupération des joueurs et du lineup à modifier
    useEffect(() => {
        const fetchData = async () => {
            try {
                // joueurs disponibles
                const { data: playersData } = await api.get("/monthlyplayers/current");
                setPlayersName(playersData.data || []);

                // lineup actuel
                const { data: lineupData } = await api.get("/lineups/me");

                const lineup = lineupData.data?.MonthlyPlayers || [];

                const formatted = positions.map(pos => {
                    const player = lineup.find(p => p.position === pos.key);

                    return {
                        position: pos.key,
                        playerId: player?.id || "",
                        predicted_pts: player?.LineupPlayer?.predicted_pts || "",
                        predicted_ast: player?.LineupPlayer?.predicted_ast || "",
                        predicted_reb: player?.LineupPlayer?.predicted_reb || "",
                    };
                });

                setPlayers(formatted);

            } catch (err) {
                console.error(err);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, []);

    // Modifications 
    const handleChange = (index, field, value) => {
        const updated = [...players];
        updated[index][field] = value;
        setPlayers(updated);
    };

    // Envoi des modifications
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (players.some(p => !p.playerId)) {
            alert("Veuillez sélectionner tous les joueurs");
            return;
        }

        const picks = players.map(p => ({
            playerId: Number(p.playerId),
            predicted_pts: Number(p.predicted_pts),
            predicted_ast: Number(p.predicted_ast),
            predicted_reb: Number(p.predicted_reb),
        }));

        try {
            await api.put("/lineups/me", { picks });
            alert("Top 5 modifié !");
            navigate("/mychallenge");
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <main className="container py-5">
            {isFetching?<p>Chargement du lineup...</p> : null}
            <form onSubmit={handleSubmit}>

                {/* Titre */}
                <div className="d-flex justify-content-center mb-5">
                    <h1 className="page-title mb-5">Modification Top 5</h1>
                </div>

                {/* Formulaire */}
                <div className="form-lineup-card row g-5 d-flex justify-content-center mt-5 px-5">

                    {players.map((player, index) => (
                <div key={player.position} className="col-md-6 col-lg-4">
                    <div className="lineup-form p-3 h-100">

                        <h4 className="form-title-part text-center mb-1"> {positions[index].label} </h4>
                        <br />

                        {/* Joueur */}
                        <label htmlFor="playerId" className="form-label fw-semibold mt-0">Nom du joueur :</label>
                        <select className="form-control" value={player.playerId}
                            onChange={(e) =>
                                handleChange(index, "playerId", e.target.value)
                            } required
                        >
                            <option value="">Sélectionner un joueur</option>
                            {playersName
                                .filter(p => p.position === player.position)
                                .sort((a,b) => a.fullname.localeCompare(b.fullname, 'fr', { sensitivity: 'base' }))
                                .map(
                                    (p) => (
                                        <option key={p.id} value={p.id}> {p.fullname} </option>))
                            }
                        </select>


                        {/* PPG */}
                        <label htmlFor="predicted_pts" className="form-label fw-semibold mt-2">Points par match (PPG) :</label>
                        <input className="form-control mb-2" type="number" step="0.1" placeholder="20.0" value={player.predicted_pts}
                            onChange={(e) =>
                                handleChange(index, "predicted_pts", e.target.value)
                            } required
                        />

                        {/* APG */}
                        <label htmlFor="predicted_ast" className="form-label fw-semibold mt-2">Passe décisive par match (APG) :</label>
                        <input type="number" step="0.1" placeholder="5.2" className="form-control mb-2" value={player.predicted_ast}
                            onChange={(e) =>
                                handleChange(index, "predicted_ast", e.target.value)
                            } required
                        />

                        {/* RPG */}
                        <label htmlFor="predicted_rbd" className="form-label fw-semibold mt-2">Rebonds par match (RPG) :</label>
                        <input type="number" step="0.1" placeholder="10.3" className="form-control" value={player.predicted_reb}
                            onChange={(e) =>
                                handleChange(index, "predicted_reb", e.target.value)
                            } required
                        />

                    </div>
                </div>
            ))}

                    {/* bouton */}
                    <div className="text-center m-5">
                        <button type="submit" className="btn t5l-btn-blue px-5">
                            Modifier mon Top 5
                        </button>
                    </div>

                </div>

            </form>
        </main>
    );
};

export default UpdateLineup;