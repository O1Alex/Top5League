import { memo, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProviders';
import VisitorResult from '../components/result/visitor-result';
import UserResult from '../components/result/user-result/ResultUser';
import AdminResult from '../components/result/admin-result/AdminResult';
import CreateOfficialLlineup from '../components/result/admin-result/CreateOfficialLlineup';
import api from '../services/api';

const Result = memo(() =>  {
    const { user } = useContext(AuthContext);
    const [officialLineup, setOfficialLineup] = useState([]);

    useEffect(() => {
        const fetchOfficialLineup = async () => {
            try {
                const { data } = await api.get("/officialLineup/current");
                setOfficialLineup(data.data?.MonthlyPlayers || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOfficialLineup();
    }, []);

    return (
        <main className="container py-5">
           
            {!user && <VisitorResult />}

            {user?.role === "users" && <UserResult />}

            {user?.role === "admin" && (
                officialLineup.length > 0 ? (
                    <AdminResult />
                ) : (
                    <CreateOfficialLlineup />
                )
            )}
        </main>
    );
});

export default Result;