import { memo, useEffect, useState } from "react";
import api from "../services/api";
import CurrentChallenge from "../components/challenge/CurrentChallenge";

const ChallengeManagement = memo(() => {
    const [month, setMonth] = useState(null);

    useEffect(() => {
        const fetchMonth = async () => {
            try {
                const { data } = await api.get("/months/current");
                setMonth(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMonth();
    }, []);

    return (
        <div>
            <CurrentChallenge challenge={month} />
        </div>
    );
});

export default ChallengeManagement;