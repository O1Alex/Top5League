import { memo, useState, useEffect } from 'react';
import MyTop5 from '../components/mytop5/MyTop5';
import HomeTop5 from '../components/mytop5/HomeTop5';
import api from '../services/api';

const MyChallenge = memo(() => {

    const [lineup, setLineup] = useState([]);
    const [loading, setLoading] = useState(true);

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
});

export default MyChallenge;