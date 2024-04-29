import React, { useState } from 'react';
import './Tickets.css';
import {UnsolvedValue,number1} from './Unsolved';
import { InProgressValue,number2 } from './InProgress';
import { SolvedValue ,number3} from './Solved';

function TicketsPop({ isOpen , handleCardClick  }) {
    const [numUnsolved, setNumUnsolved] = useState(0);
    const [numInProgress, setNumInProgress] = useState(0);
    const [numSolved, setNumSolved] = useState(0);

    const handleUnsolvedTicketsClick = () => {
        // Your logic for handling unsolved tickets click event
    };

    const handleInProgressTicketsClick = () => {
        // Your logic for handling in-progress tickets click event
    };

    const handleSolvedTicketsClick = () => {
        // Your logic for handling solved tickets click event
    };

    return (
        <section id="TicketsPop" className={isOpen ? "Tickets_open" : "Tickets"}>
            <article onClick={() => handleCardClick('Unsolved')} style={{ '--clr': '#ff1867' }} className="popTicket red">
                <section>
                    <h5>Unsolved Tickets <i className="fa-solid fa-envelope"></i></h5>
                </section>
                <UnsolvedValue/>
            </article>
            <article onClick={() => handleCardClick('InProgress')} style={{ '--clr': '#6eff3e' }} className="popTicket green">
                <section>
                    <h5>In Progress<i className="fa-solid fa-envelope-open"></i></h5>
                </section>
                <InProgressValue/>
            </article>
            <article onClick={() => handleCardClick('Solved')} style={{ '--clr': '#1e9bff' }} className="popTicket">
                <section>
                    <h5>Solved Tickets <i className="fa-sharp fa-solid fa-circle-check"></i></h5>
                </section>
                <SolvedValue/>
            </article>
        </section>
    );
}
export default function total(){
    return(
        <p id="Num_tickets">{number1() + number2() + number3()}</p>
    );
}


export {TicketsPop};
