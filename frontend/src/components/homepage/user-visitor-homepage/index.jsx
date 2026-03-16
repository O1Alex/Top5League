import React from 'react';
import Rules from './Rules';
import Challenge from './Challenge';
import Top20 from './Top20';

const Home= memo(() => {
    return (
        <main class="flex-grow-1 py-4">
            <div class="container">

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

export default Home;
