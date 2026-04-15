import { memo } from 'react'

const CurrentChallenge = memo(({challenge, onEdit, onClose}) => {

    if (!challenge) return <p>Chargement...</p>;

    const getStatusLabel = (status) => {
        switch (status) {
            case "open":
                return "Ouvert";
            case "closed":
                return "Fermé";
            case "published":
                return "Publié";
            default:
                return "Inconnu";
        }
    };

    return (
         <section className='current-challenge container my-5'>
            <div className="challenge-card border rounded">

                {/* HEADER */}
                <div className="d-flex">
                    <div className="flex-fill p-3 border-bottom fw-bold">
                        Challenge en cours
                    </div>
                    <div className="p-3 border-bottom fw-bold text-center" style={{ width: "250px" }}>
                        Actions
                    </div>
                </div>

                {/* BODY */}
                <div className="d-flex">

                    {/* INFOS */}
                    <div className="flex-fill p-4">

                        <p><strong>Label :</strong> {challenge.label}</p>

                        <p>
                            <strong>Date début participation :</strong>{" "}
                            {new Date(challenge.start_date).toLocaleString()}
                        </p>

                        <p>
                            <strong>Date fin participation :</strong>{" "}
                            {new Date(challenge.end_date).toLocaleString()}
                        </p>

                        <p>
                            <strong>Status :</strong> {getStatusLabel(challenge.status)}
                        </p>

                    </div>

                    {/* ACTIONS */}
                    <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-4 border-start" style={{ width: "250px" }}>
                        <button className="btn t5l-btn-blue w-100" onClick={onEdit}>
                            Modifier les dates
                        </button>

                        <button className="btn t5l-btn-orange w-100" onClick={onClose}>
                            Clôturer le challenge
                        </button>
                    </div>

                </div>

            </div>

        </section>
    )
});

export default CurrentChallenge
