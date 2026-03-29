import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";

const UpdateLineup= memo(() => {

    const [lineup, setLineup]= useState({});
    const navigate = useNavigate();

    // Récupération joueur
    useEffect(() => {
        const fetchLineup = async () => {
            try {
                const { data } = await api.get("/lineups/me");
                setLineup(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLineup();
    }, []);


    // Envoi modification joueur
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put("/lineups/me", lineup);
            alert("Top 5 Modifié !");
            navigate("/mychallenge");

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div></div>
    )
});

export default UpdateLineup;
