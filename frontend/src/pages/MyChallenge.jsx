import { memo } from 'react';
import MyTop5 from '../components/mytop5/myTop5';


const MyChallenge = memo(() =>  {
    return (
        <main className="container py-5">
            <MyTop5 />
        </main>
    )
});

export default MyChallenge;
