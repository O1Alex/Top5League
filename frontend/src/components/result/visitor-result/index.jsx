import React from 'react'
import ReferenceLineup from '../ReferenceLineup';
import MonthWinner from '../MonthWinner';
import IntroResultVisitor from './IntroResultVisitor';


const VisitorResult= memo(() => {

    return (
        <div>
            <IntroResultVisitor />
             <section className='lineup-result d-flex row'>
                <ReferenceLineup />
                <MonthWinner />
            </section>
        </div>

        

       
        
    )
});

export default VisitorResult;
