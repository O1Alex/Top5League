import { memo } from 'react'

const ChallengeHistory = memo(({challenges}) => {

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
        <section className='challenge-history mt-5 mb-5 text-center'>
            <h5 className='mb-3'> Historique des Challenges </h5>
            <table className="challenge-table text-center align-middle">
                <thead>
                    <tr className='title-challenge-table'>
                        <th>Label</th>
                        <th>Publication</th>
                        <th>Participants</th>
                        <th>Satut</th>
                        <th>Gagnant</th>
                    </tr>
                </thead>

                <tbody>
                   {challenges.map((month) => (
                        <tr key={month.id} className='data-challenge-table'>
                            <td>{month.label}</td>
                            <td>{month.publish_date}</td>
                            <td>**</td>{/* <td>{user.email}</td> Faire en sorte de récupéré le nombre joueurs dans le mois */}
                            <td>{getStatusLabel(month.status)}</td>
                            <td>**</td>{/* <td>{user.role}</td> Faire en sorte de récupérer le gagnant du mois selectionné */}
                        </tr>
                   ))}
                </tbody>
            </table>
        </section>
    )
})

export default ChallengeHistory
