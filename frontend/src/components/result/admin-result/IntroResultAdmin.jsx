import { memo }from 'react'

const IntroResultAdmin= memo(({winner}) => {

    console.log("winner:", winner);

    return (
        <section className='intro-result-admin'>
            <div className=" title d-flex justify-content-center mb-4">
                <h2 className="page-title mb-4">Les Résultats</h2>
            </div>

            <div className='intro-text-admin text-center mb-5'>
                <p>Ca y est ! Le 5 de référence est publié et le grand gagnant est désigné ! Je te laisse maintenant le plaisir de lui <br />
                annoncer et celui de pouvoir comparer par toi même son 5 majeurs et le 5 majeur gagnant !</p>
            </div>

            <table className="table table-striped users-table text-center align-middle mt-3 mb-5 w-50 mx-auto">
                <thead>
                    <tr className='title-table'>
                        <th>{winner?.User?.username}</th>
                    </tr>
                </thead>

                <tbody>
                   <tr className="data-table">
                        <td className="d-flex justify-content-between px-3">
                            <span className="fw-semibold">Email :</span>
                            <span>{winner?.User?.email}</span>
                        </td>
                    </tr>

                    <tr className="data-table">
                        <td className="d-flex justify-content-between px-3">
                            <span className="fw-semibold">Joueur préféré :</span>
                            <span>{winner?.User?.favorite_player}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </section>
    )
});

export default IntroResultAdmin;
