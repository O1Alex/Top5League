import { memo } from 'react';
import IntroResult from './IntroResult';
import ResultLineups from '../result-lineups/ResultLineups';

const UserVisitorResult= memo(({winner}) => {

    return (
        <div>
            <IntroResult winner = {winner}/>
            <section className='lineup-result d-flex row'>          
                <ResultLineups />   
            </section>
        </div>
        
    )
});

export default UserVisitorResult;
