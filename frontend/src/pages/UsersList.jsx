import { memo, useEffect, useState } from 'react'
import api from '../services/api';

const UsersList = memo(() => {

    const [users, setUsers] = useState([]);

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


    return (
        <main className="container py-5">
            <div className=" title d-flex justify-content-center mb-5">
                <h2 className="page-title">Liste des utilisateurs</h2>
            </div>

            <table className="table users-table text-center align-middle">
                <thead>
                    <tr>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Joueur favoris</th>
                        <th>Rôle</th>
                    </tr>
                </thead>

                <tbody>
                   {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.favorite_player}</td>
                            <td>{user.role}</td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </main>
    )
});

export default UsersList;
