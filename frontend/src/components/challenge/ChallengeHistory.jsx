import { useEffect, useState } from "react";
import { memo } from "react";
import api from "../../services/api";

const ChallengeHistory = memo(({ challenges, currentMonth }) => {
  const [lineupCounts, setLineupCounts] = useState({});
  const [winners, setWinners] = useState({});
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

  useEffect(() => {
    if (!challenges || challenges.length === 0) return;

    const init = async () => {
      const wins = {};
      const counts = {};
      await Promise.all(
        challenges.map(async (month) => {
          if (month.id === currentMonth?.id) {
            return;
          }
          try {
            const { data } = await api.get(`/lineups/${month.id}`);
            counts[month.id] = data.data?.length ?? 0;
          } catch (err) {
            console.error(
              `Erreur lors de la récupération du nombre de participants pour le challenge ${month.id}:`,
              err,
            );
            counts[month.id] = "-";
          }

          try {
            const { data } = await api.get(`/winner/${month.id}`);
            wins[month.id] = data.data?.User?.username ?? "-";
          } catch (err) {
            console.error(
              `Erreur lors de la récupération du gagnant pour le challenge ${month.id}:`,
              err,
            );
            wins[month.id] = "-";
          }
        }),
      );
      setLineupCounts(counts);
      setWinners(wins);
    };
    init();
  }, [challenges, currentMonth?.id]);

  if (!challenges || challenges.length === 0) {
    return (
      <section className="challenge-history mt-5 mb-5 text-center">
        <h5 className="mb-3"> Historique des Challenges </h5>
        <p>Aucun challenge disponible.</p>
      </section>
    );
  }

  return (
    <section className="challenge-history mt-5 mb-5 text-center">
      <h5 className="mb-3"> Historique des Challenges </h5>
      <table className="challenge-table text-center align-middle">
        <thead>
          <tr className="title-challenge-table">
            <th>Label</th>
            <th>Publication</th>
            <th>Participants</th>
            <th>Satut</th>
            <th>Gagnant</th>
          </tr>
        </thead>

        <tbody>
          {challenges.map((month) => (
            <tr key={month.id} className="data-challenge-table">
              <td>{month.label}</td>
              <td> {month.publish_date? new Date(month.publish_date).toLocaleDateString() : "Non publié"}</td>
              <td>{lineupCounts[month.id] ?? "-"}</td>
              <td>{getStatusLabel(month.status)}</td>
              <td>{winners[month.id] ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
});

export default ChallengeHistory;