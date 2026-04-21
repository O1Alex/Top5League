import { memo, useState } from 'react'
import AttendeesModal from './AttendeesModal';

const Participation = memo(({challenge, lineups, user}) => {

    if (!challenge) return <p>Chargement...</p>;

    const [showModal, setShowModal]= useState(false);

    return (
        <section className='participation'>
            <div className='card challenge-card'>

                <div className='card-header'>
                    <h5 className='card-title'>Participations</h5>
                </div>

                <div className='card-body text-center'>

                    {/* Nombre de participants */}
                    <div className='content-card d-flex flex-column flex-md-row justify-content-md-between px-2 mb-4'>
                        <span>Nombre de participation enregistré(s):</span>
                        <span className='flash'><strong>{lineups?.length || 0}</strong></span>
                    </div>

                    {/* Participants au challenge en cours */}
                    <div className="d-flex justify-content-center mt-5">
                        <button to={"/"}  className="btn t5l-btn-blue " onClick={() => setShowModal(true)}>
                            Voir les participants
                        </button>
                    </div>

                </div>
            </div>

            <AttendeesModal
                show={showModal}
                close={() => setShowModal(false)}
                lineups={lineups}
            />

        </section>
    )
});

export default Participation
