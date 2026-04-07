import { memo, useEffect, useState }from 'react'
import api from '../../../services/api';

const IntroResultAdmin= memo(() => {

    const [winner, setWinner]= useState(null);

   useEffect(() => {
        const fetchWinner = async () => {
            try {
                const { data } = await api.get("/winner/current");
                setWinner(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWinner();
    }, );

    if (!winner) return <p>Chargement...</p>;

    return (
        <section className='intro-result-admin'>
            <div className=" title d-flex justify-content-center mb-5">
                <h2 className="page-title mb-4">Les Résultats</h2>
            </div>

            <div className='intro-text-admin text-center mb-4'>
                <p>Ca y est ! Le 5 de référence est publié et le grand gagnant est désigné ! Je te laisse maintenant le plaisir de lui <br />
                annoncer et celui de pouvoir comparer par toi même son 5 majeurs et le 5 majeur gagnant !</p>
            </div>

            <table className="table table-striped users-table text-center align-middle mt-3 mb-5">
                <thead>
                    <tr className='title-table'>
                        <th>{winner.User?.fullname}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className='data-table'>
                        <td>Email:  {winner.User?.email}</td>
                        <td>Joueur favoris: {winner.User?.favorite_player}</td>
                    </tr>
                </tbody>
            </table>
            
        </section>
    )
});

export default IntroResultAdmin;
