import { useContext, useEffect, useState } from 'react'
import api from '../services/api';
import { AuthContext } from '../context/AuthProviders';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const {user, loading} = useContext(AuthContext);
    const navigate = useNavigate();


    // // Protection accès admin
    useEffect(() => {
        if (!loading && user?.role !== "admin") navigate("/");
    }, [user, loading, navigate]);

    // Récupération des utilisateurs
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
                <h2 className="page-title mb-4">Liste des utilisateurs</h2>
            </div>

            <table className="table table-striped users-table text-center align-middle">
                <thead>
                    <tr className='title-table'>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Joueur favoris</th>
                        <th>Rôle</th>
                    </tr>
                </thead>

                <tbody>
                   {users.map((user) => (
                        <tr key={user.id} className='data-table'>
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
};

export default UsersList;
