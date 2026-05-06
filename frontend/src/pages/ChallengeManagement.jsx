import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import CurrentChallenge from "../components/challenge/CurrentChallenge";
import Participation from "../components/challenge/Participation";
import NewChallenge from "../components/challenge/NewChallenge";
import ChallengeHistory from "../components/challenge/ChallengeHistory";
import { AuthContext } from "../context/AuthProviders";
import { useNavigate } from "react-router-dom";

const ChallengeManagement = () => {
    const [currentMonth, setCurrentMonth] = useState(null);
    const [lineups, setLineups] = useState([]);
    const [months, setMonths] = useState([]);

    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // // Protection accès administrateur
    useEffect(() => {
        if(!loading && user?.role !== "admin") {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    // Récupération du mois en cours
    const fetchCurrentMonth = async () => {
        try {
            const { data } = await api.get("/months/current");
            setCurrentMonth(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Récupération des lineups en cours
    const fetchLineups = async () => {
        try {
            const {data} = await api.get("/lineups/")
            setLineups(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Récupération de tous les challenges
    const fetchMonths = async () => {
        try {
            const { data } = await api.get("/months/");
            setMonths(data.data);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect (() => {
        const init = async () => {
            await fetchMonths();
            await fetchLineups();
            await fetchCurrentMonth();
        }
        init();

    }, []);
    


    return (
        <main className="container">
            <div className="top-challenge">
                <CurrentChallenge challenge={currentMonth} />
            </div>

            <div className="center-challenge row g-4 mb-5">
                <div className="col-12 col-lg-6">
                    <Participation challenge={currentMonth} />
                </div>
                <div className="col-12 col-lg-6">
                    <NewChallenge />
                </div>
            </div>

            <div className="bottom-challenge">
                <ChallengeHistory challenges={months} />
            </div>
            
        </main>
    );
};

export default ChallengeManagement;