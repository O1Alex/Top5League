import { useEffect, useState } from "react";
import api from "../services/api";
import CurrentChallenge from "../components/challenge/CurrentChallenge";
import Participation from "../components/challenge/Participation";
import NewChallenge from "../components/challenge/NewChallenge";
import ChallengeHistory from "../components/challenge/ChallengeHistory";

const ChallengeManagement = () => {
    const [currentMonth, setCurrentMonth] = useState(null);
    const [lineups, setLineups] = useState([]);
    const [months, setMonths] = useState([]);
    const [winner, setWinner] = useState(null);

    // Récupération du challenge en cours
    useEffect(() => {
        const fetchCurrentMonth = async () => {
            try {
                const { data } = await api.get("/months/current");
                setCurrentMonth(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCurrentMonth();
    }, []);

    // Récupération des lineups en cours
    useEffect(() => {
        const fetchLineups = async () => {
            try {
                const {data} = await api.get("/lineups/current")
                setLineups(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLineups();
    }, [])

    // Récupération de tous les challenges
    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const { data } = await api.get("/months/");
                setMonths(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMonths();
    }, []);
    
    // Récupération des gagnant par l'id du mois correspondant
    useEffect(() => {
        const fetchWinner = async () => {
            try {
                const { data } = await api.get(`/winner/${months.id}`);
                setWinner(data.data);             
            } catch (err) {
                console.error(err);
            }
        };

        fetchWinner();
    }, []);


    return (
        <main className="container">
            <div className="top-challenge">
                <CurrentChallenge challenge={currentMonth} />
            </div>

            <div className="center-challenge row g-4 mb-5">
                <div className="col-12 col-lg-6">
                    <Participation lineups={lineups} challenge={currentMonth} />
                </div>
                <div className="col-12 col-lg-6">
                    <NewChallenge />
                </div>
            </div>

            <div className="bottom-challenge">
                <ChallengeHistory challenges={months} winner={winner} />
            </div>
            
        </main>
    );
};

export default ChallengeManagement;