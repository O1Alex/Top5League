import { memo, useContext } from "react";
import { AuthContext } from "../../context/AuthProviders";
import { Link } from "react-router-dom";
import api from "../../services/api";

const OfficialPlayerCard = memo(({ player, showAdminActions = true }) => {

    const { user } = useContext(AuthContext);

    const handleDelete = async () => {
        if (!window.confirm("Voulez vous vraiment supprimer ce joueur ?")) return;

        try {
            await api.delete(`/monthlyPlayers/${player.id}`);
            alert("Joueur supprimé !");
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center mb-4">
            <div className="card card-player p-3 text-center">

                <img src={player.photo_url || "/default-player.png"} alt={player.fullname} className="card-img-top"/>

                <h5 className="card-title mt-2 mb-0">
                    {player.fullname}
                </h5>

                <div className="card-body pb-0 flex-grow-0">
                    <div className="d-flex justify-content-between">
                        <p className="my-0">Poste : {player.position}</p>
                        <p className="my-0">PPG : {player.pts}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p>APG : {player.ast}</p>
                        <p>RPG : {player.reb}</p>
                    </div>
                </div>

                 {user?.role === "admin" && showAdminActions && (
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center mt-0">
                             <Link to={`/updateplayer/${player.id}`}  className="btn t5l-btn-blue btn-sm w-75">
                                Modifier
                            </Link>
                        </div>
                       
                        <div className="d-flex justify-content-center mt-3">
                             <button onClick={handleDelete} className="btn t5l-btn-orange btn-sm w-75 mb-2">
                                Supprimer
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
});

export default OfficialPlayerCard;