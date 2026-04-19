import { memo, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProviders';
import AdminResult from '../components/result/admin-result/AdminResult';
import CreateOfficialLlineup from '../components/result/admin-result/CreateOfficialLlineup';
import api from '../services/api';
import UserVisitorResult from '../components/result/user-visitor-result/UserVisitorResult';

const Result = memo(() =>  {
    console.log("🔁 Result render");
    const { user } = useContext(AuthContext);
    const [officialLineup, setOfficialLineup] = useState([]);
    const [winner, setWinner] = useState(null);
    


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

    useEffect(() => {
        const fetchWinner = async () => {
            try {
                const { data } = await api.get("/winner/current");
                setWinner(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWinner();
    }, []);


    return (
        <main className="container py-5">
           
            {(!user || user?.role === "user") && <UserVisitorResult winner={winner}/>}

            {user?.role === "admin" && (
                officialLineup.length > 0 ? (
                    <AdminResult winner={winner}/>
                ) : (
                    <CreateOfficialLlineup />
                )
            )}
        </main>
    );
});

export default Result;