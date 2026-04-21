import { useContext } from 'react';
import HomeVisitorUser from '../components/homepage/user-visitor-homepage/index';
import HomeAdmin from '../components/homepage/admin-homepage/index';
import { AuthContext } from '../context/AuthProviders';


const Home = () => {

    const { user } = useContext(AuthContext);

    return(
        <>
            {(!user || user?.role==="user") &&(
                <HomeVisitorUser />
            )}

            {user?.role==="admin"&&(
                <HomeAdmin />
            )}
        </>
    )
};

export default Home;