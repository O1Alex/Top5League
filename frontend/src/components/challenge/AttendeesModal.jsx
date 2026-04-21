import { memo, useEffect, useState } from "react"
import api from "../../services/api";

const AttendeesModal = memo(({show, close, lineups}) => {
    
    const [users, setUsers]= useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get("/users");
                setUsers(data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    if (!show) return null;

    return (
         <div className="modal-container">
            <div className="modal-attendees">

                <table className="text-center">
                    <thead>
                        <tr>
                            <th>Participants</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lineups.map((lineup) => {
                            const user = users.find(u => u.id === lineup.user_id);

                            return (
                                <tr key={lineup.id}>
                                    <td>{user?.username || "Inconnu"}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>

                <div className="modal-footer mt-3">
                    <button className="btn t5l-btn-blue btn-sm" onClick={close}>
                        Fermer
                    </button>
                </div>

            </div>
        </div>
    )
});

export default AttendeesModal
