import React from 'react';
import pp from './pp.png'
import './TheTicket.css';
import TicketsInfor from './TicketsInfor';

function TheTicket({isClicked,name,handleCardClick}) {

    return (
            <article id="pop" className={isClicked ? "pop1_open" : "pop1"} >
             <TicketsInfor personName={name} handleCardClick={handleCardClick} />
            </article>
    
        
    );
}


export default TheTicket;
