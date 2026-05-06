import { useState, useEffect } from 'react';
import MyTop5 from '../components/mytop5/MyTop5';
import HomeTop5 from '../components/mytop5/HomeTop5';
import api from '../services/api';
import { AuthContext } from "../context/AuthProviders";
import { useNavigate } from 'react-router-dom';


const MyChallenge = () => {

    const [lineup, setLineup] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    
    // // Protection accès utilisateur
    useEffect(() => {
        if (!loading && user?.role !== "user") navigate("/");
    }, [user, loading, navigate]);

    useEffect(() => {
        const fetchLineup = async () => {
            try {
                const { data } = await api.get(`/lineups/me`);
                setLineup(data.data.MonthlyPlayers);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLineup();
    }, []);

    if (loading) {
        return (
            <main className="container py-5 text-center">
                <p>Chargement du Top 5...</p>
            </main>
        );
    }

    

    return (
        <main className="container py-5">
            {lineup.length > 0 ? (
                <MyTop5 lineup={lineup} />
            ) : (
                <HomeTop5 />
            )}
        </main>
    );
};

export default MyChallenge;