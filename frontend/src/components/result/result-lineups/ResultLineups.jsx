import ReferenceLineup from './ReferenceLineup';
import MonthWinner from './MonthWinner';
import MyLineup from './MyLineup';
import { memo, useContext } from 'react';
import { AuthContext } from '../../../context/AuthProviders';

const ResultLineups= memo(() => {
    const { user } = useContext(AuthContext);
    const isUser = user?.role === "user";

    return (
        <section className="row g-4 mb-4">

        {isUser && (
            <div className="col-12 col-md-6 col-lg-4">
                <div className="result-part d-flex flex-column align-items-center">
                    <h3 className="text-center page-title mb-4">Mon top 5</h3>
                    <MyLineup />
                </div>
            </div>
        )}

        <div className={isUser ? "col-12 col-md-6 col-lg-4" : "col-12 col-md-6"}>
            <div className="result-part d-flex flex-column align-items-center">
                <h3 className="text-center page-title mb-4">Top 5 officiel</h3>
                <ReferenceLineup />
            </div>
        </div>

        <div className={isUser ? "col-12 col-md-6 col-lg-4" : "col-12 col-md-6"}>
            <div className="result-part d-flex flex-column align-items-center">
                <h3 className="text-center page-title mb-4">Top 5 gagnant</h3>
                <MonthWinner />
            </div>
        </div>

    </section>
    )
});

export default ResultLineups;
