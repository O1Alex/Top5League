import { memo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../services/api";

const UpdatePlayer= memo(() => {

    const { id } = useParams();
    const [player, setPlayer]= useState({});
    const navigate = useNavigate();

    // Récupération joueur
    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const { data } = await api.get(`/monthlyPlayers/${id}`);
                console.log(data.data);
                setPlayer(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPlayer();
    }, [id]);


    // Envoi modification joueur
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedPlayer = {
                fullname: player.fullname,
                position: player.position,
                pts: Number(player.pts),
                ast: Number(player.ast),
                reb: Number(player.reb),
                photo_url: player.photo_url
            };

            console.log("DATA SENT:", formattedPlayer);

            await api.put(`/monthlyPlayers/${id}`, formattedPlayer);

            alert("Joueur modifié !");
            navigate("/monthlyplayers");

        } catch (err) {
            console.error("ERROR:", err.response?.data || err.message);
        }
    };


    return (
        <main className="container py-5">
            {/* Titre */}
            <div className=" title d-flex justify-content-center mb-5">
                <h1 className="page-title">Modification joueur</h1>
            </div>


            {/* Card */}
            <div className="player-card mx-auto p-4">
                <form onSubmit={handleSubmit}>
                    {/* Poste */}
                    <div className="poste mb-3">
                        <label htmlFor="position" className="form-label fw-semibold">Poste :</label>
                        <select className="form-select top5-select" id="position" name="position" value={player.position} onChange={(e) => setPlayer({ ...player, position: e.target.value })} required>
                            <option value="PG">Point Guard (PG)</option>
                            <option value="SG">Shooting Guard (SG)</option>
                            <option value="SF">Small Forward (SF)</option>
                            <option value="PF">Power Forward (PF)</option>
                            <option value="C">Center (C)</option>
                        </select>
                    </div>

                    {/* Nom */}
                    <div className="nom-du-joueur mb-3">
                        <label htmlFor="fullname" className="form-label fw-semibold">Nom du joueur :</label>
                        <input type="text" id="fullname" className="form-control top5-input" value={player.fullname}  onChange={(e) => setPlayer({ ...player, fullname: e.target.value })} required/>
                    </div>

                    {/* PPG */}
                    <div className="ppg mb-3">
                        <label htmlFor="ppg" className="form-label fw-semibold">Points par match (PPG) :</label>
                        <input type="number" step="0.1" id="ppg" className="form-control top5-input" value={player.pts} onChange={(e) => setPlayer({ ...player, pts: Number(e.target.value) })} required/>
                    </div>

                    {/* APG */}
                    <div className="apg mb-3">
                        <label htmlFor="apg" className="form-label fw-semibold">Passes décisive par match (APG) :</label>
                        <input type="number" step="0.1" id="apg" className="form-control top5-input" value={player.ast} onChange={(e) => setPlayer({ ...player, ast: Number(e.target.value) })} required/>
                    </div>

                    {/* RPG */}
                    <div className="rpg mb-3">
                        <label htmlFor="rpg" className="form-label fw-semibold">Rebonds par match (RPG) :</label>
                        <input type="number" step="0.1" id="rpg" className="form-control top5-input" value={player.reb} onChange={(e) => setPlayer({ ...player, reb: Number(e.target.value) })} required/>
                    </div>

                    {/* PHOTO */}
                    <div className="photo mb-4">
                        <label htmlFor="photo" className="form-label fw-semibold">Photo du joueur:</label>
                        <input type="text" id="photo" className="form-control top5-input" value={player.photo_url} onChange={(e) => setPlayer({ ...player, photo_url: e.target.value })}/>
                    </div>

                    {/* Bouton */}
                    <button type="submit" className="btn t5l-btn-blue w-100"> Modifier le joueur </button>
                </form>
            </div>
        </main>
    )
});

export default UpdatePlayer;