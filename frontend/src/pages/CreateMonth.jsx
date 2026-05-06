import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";
import { AuthContext } from '../context/AuthProviders';

const CreateMonth = () => {

    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [month, setMonth] = useState({
        label: "",
        start_date: "",
        end_date: "",
        publish_date: ""
    });

    // Protection accès admin
    useEffect(() => {
        if (!loading && user?.role !== "admin") {
            navigate("/");
        }
    }, [user, loading, navigate]);

    // Gestion des inputs
    const handleChange = (field, value) => {
        setMonth(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Envoi du nouveau mois
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/months', month);
            alert("Nouveau challenge créé !");
            navigate("/monthlyplayers");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création");
        }
    };

    return (
        <main className="container py-5">

            {/* Titre */}
            <div className="d-flex justify-content-center mb-5">
                <h2 className="page-title">Création du nouveau challenge</h2>
            </div>

            {/* Card */}
            <div className="player-card mx-auto p-4">
                <form onSubmit={handleSubmit}>

                    {/* Label */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Label :</label>
                        <input
                            type="text"
                            className="form-control"
                            value={month.label}
                            onChange={(e) => handleChange("label", e.target.value)}
                            placeholder="Ex: 2026-06"
                            required
                        />
                    </div>

                    {/* Date début */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Date de début :</label>
                        <input
                            type="date"
                            className="form-control"
                            value={month.start_date}
                            onChange={(e) => handleChange("start_date", e.target.value)}
                            required
                        />
                    </div>

                    {/* Date fin */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Date de fin :</label>
                        <input
                            type="date"
                            className="form-control"
                            value={month.end_date}
                            onChange={(e) => handleChange("end_date", e.target.value)}
                            required
                        />
                    </div>

                    {/* Date publication */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Date de publication :</label>
                        <input
                            type="date"
                            className="form-control"
                            value={month.publish_date}
                            onChange={(e) => handleChange("publish_date", e.target.value)}
                            required
                        />
                    </div>

                    {/* Bouton */}
                    <button type="submit" className="btn t5l-btn-blue w-100">
                        Créer le challenge
                    </button>

                </form>
            </div>

        </main>
    );
};

export default CreateMonth;