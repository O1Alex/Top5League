import ReferenceLineup from '../ReferenceLineup';
import MonthWinner from '../MonthWinner';
import { memo } from 'react';
import IntroResultUser from './IntroResultUser';
import MyLineup from '../MyLineup';

const UserResult= memo(() => {

    return (
        <div>
            <IntroResultUser />
             <section className='lineup-result d-flex row'>
                <MyLineup />
                <ReferenceLineup />
                <MonthWinner />
            </section>
        </div>

        

       
        
    )
});

export default UserResult;
