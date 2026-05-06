import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";
import { AuthContext } from '../context/AuthProviders';

const UpdateMonth= () => {

    const [month, setMonth]= useState({});

    const navigate = useNavigate();
    const {user, loading} = useContext(AuthContext);

    const formatDate = (date) => {
        return date ? date.split("T")[0] : "";
    };

    // // Protection accès admin
    useEffect(() => {
        if (!loading && user?.role !== "admin") navigate("/");
    }, [user, loading, navigate]);


    // Récupération du mois
    useEffect(() => {
        const fetchMonth = async () => {
            try {
                const { data } = await api.get(`/months/current`);
                console.log(data.data);
                setMonth(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMonth();
    }, []);


    // Envoi modification du mois
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedMonth= {
                label: month.label,
                start_date: month.start_date,
                end_date: month.end_date,
                publish_date: month.publish_date,
                status: month.status
            };


            await api.put(`/months/${month.id}`, formattedMonth);

            alert("Challenge modifié!");
            navigate("/challengemanagement");

        } catch (err) {
            console.error("ERROR:", err.response?.data || err.message);
        }
    };


    return (
        <main className="container py-5">
            {/* Titre */}
            <div className=" title d-flex justify-content-center mb-5">
                <h2 className="page-title">Modification du challenge en cours</h2>
            </div>


            {/* Card */}
            <div className="player-card mx-auto p-4">
                <form onSubmit={handleSubmit}>
                    {/* Label du challenge */}
                    <div className="poste mb-3">
                        <label htmlFor="position" className="form-label fw-semibold">Label :</label>
                        <input type="text" id='label' className="form-control top5-input" value={month.label} onChange={(e) => setMonth({ ...month, label: e.target.value })} required/>
                    </div>

                    {/* Date de début*/}
                    <div className="nom-du-joueur mb-3">
                        <label htmlFor="fullname" className="form-label fw-semibold">Date de début :</label>
                        <input type="date" id="start_date" className="form-control top5-input" value={formatDate(month.start_date)}  onChange={(e) => setMonth({ ...month, start_date: e.target.value })} required/>
                    </div>

                    {/* Date de fin*/}
                    <div className="ppg mb-3">
                        <label htmlFor="ppg" className="form-label fw-semibold">Date de fin :</label>
                        <input type="date" id="end_date" className="form-control top5-input" value={formatDate(month.end_date)} onChange={(e) => setMonth({ ...month, end_date: e.target.value })} required/>
                    </div>

                    {/* Date de publication*/}
                    <div className="apg mb-3">
                        <label htmlFor="apg" className="form-label fw-semibold">Date de publication des résultats :</label>
                        <input type="date" id="publish_date" className="form-control top5-input" value={formatDate(month.publish_date)} onChange={(e) => setMonth({ ...month, publish_date: e.target.value })} required/>
                    </div>

                    {/* Status du challenge */}
                    <div className="rpg mb-3">
                        <label htmlFor="rpg" className="form-label fw-semibold">Statut du challenge :</label>
                        <select id="status" className="form-control top5-input" value={month.status} onChange={(e) => setMonth({ ...month, status: e.target.value })} required>
                            <option value="open">Ouvert</option>
                            <option value="closed">Fermé</option>
                            <option value="published">Publié</option>
                        </select>
                    </div>

                    {/* Bouton */}
                    <button type="submit" className="btn t5l-btn-blue w-100"> Modifier le challenge </button>

                </form>
            </div>
        </main>
    )
};

export default UpdateMonth;