import { memo } from 'react'
import Welcome from './Welcome';
import Challenge from './Challenge';
import Top20 from '../Top20';

const HomeAdmin= memo(() => {
    return (
        <main className="flex-grow-1 py-4">
            <div className="container">

                {/* Section Bienvenue */}
                <Welcome />
                <Challenge />
                <Top20 />
            
            </div>         
        </main>
    )
});

export default HomeAdmin;
