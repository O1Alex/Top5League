import { memo } from 'react';
import Rules from './Rules';
import Challenge from './Challenge';
import Top20 from '../Top20';

const HomeVisitorUser= memo(() => {
    return (
        <main className="flex-grow-1 py-4">
            <div className="container">

                {/* Section règle du jeu */}
                <Rules />
                {/* Section Challenge */}
                <Challenge />
                {/* Section Appercu Top 20 du mois */}
                <Top20 />
            
            </div>         
        </main>
    )
});

export default HomeVisitorUser;
