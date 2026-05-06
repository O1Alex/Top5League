import { useContext } from 'react';
import HomeVisitorUser from '../components/homepage/user-visitor-homepage/index';
import HomeAdmin from '../components/homepage/admin-homepage/index';
import { AuthContext } from '../context/AuthProviders';


const Home = () => {

    const { user, loading} = useContext(AuthContext);

    if(loading) return null;

    return(
        <>
            {user?.role === "admin" ? <HomeAdmin /> : <HomeVisitorUser />}
        </>
    )
};

export default Home;