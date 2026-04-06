import { memo } from "react";

const PredictedPlayerCard = memo(({ player }) => {

    return (
        <div className="col-12 col-md-4 d-flex justify-content-center g-4 mb-5">
            <div className="card card-player p-3 text-center">

                <img src={player.photo_url} alt={player.fullname} className="card-img-top"/>

                <h5 className="card-title mt-2 mb-0">
                    {player.fullname}
                </h5>

                <div className="card-body pb-0 flex-grow-0">
                    <div className="d-flex justify-content-between">
                        <p className="my-0">Poste : {player.position}</p>
                        <p className="my-0">PPG : {player.LineupPlayer.predicted_pts}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p>APG : {player.LineupPlayer.predicted_ast}</p>
                        <p>RPG : {player.LineupPlayer.predicted_reb}</p>
                    </div>
                </div>

            </div>
        </div>
    );
});

export default PredictedPlayerCard;