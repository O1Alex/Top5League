import { memo, useEffect, useState } from 'react';
import PredictedPlayerCard from '../PredictedPlayerCard';
import { Link } from 'react-router-dom';

const MyTop5 = memo(({lineup}) => {

    return (
    
        <section className="top-position p-4">

            <div className="div-title-top d-flex mb-5 justify-content-center">
                <h1 className="title-part">Mon Top 5</h1>
            </div>

            <div className="top-card row d-flex justify-content-center mt-5">
               {lineup.map((player) => (
                    <PredictedPlayerCard key={player.id} player={player} />
                ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
                <Link to={"/updatelineup"}  className="btn t5l-btn-blue btn-sm ">
                    Modifier mon Top 5
                </Link>
            </div>

        </section>

    )
});

export default MyTop5;