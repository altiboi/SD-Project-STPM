import React, { useState, useEffect } from 'react';
import pp from './pp.png';

function Unsolved({ handleTicket }) {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await fetch('https://showresidents.azurewebsites.net/api/getUnsolved_Tickets?');
            if (!response.ok) {
                throw new Error('Failed to fetch tickets data');
            }
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets data:', error);
        }
    };

    return (
        <>
            {tickets.map((person, index) => (
                <div key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src={pp} alt="" />
                            <p onClick={() => handleTicket(person._id)} className="name">
                                {person._id}
                            </p>
                        </section>
                        <ul className="vC">
                            <li className="variables">{person.title}</li>
                            <li className="variables">{person.ticket_subject}</li>
                            <li className="variables">{person.dateOpened}</li>
                        </ul>
                    </article>
                </div>
            ))}
        </>
    );
}

function UnsolvedValue() {
    const [numTickets, setNumTickets] = useState('Loading...');

    useEffect(() => {
        fetchTicketCount();
    }, []);

    const fetchTicketCount = async () => {
        try {
            const response = await fetch('https://showresidents.azurewebsites.net/api/getUnsolved_Tickets?');
            if (!response.ok) {
                throw new Error('Failed to fetch tickets count');
            }
            const data = await response.json();
            setNumTickets(data.length);
        } catch (error) {
            console.error('Error fetching tickets count:', error);
        }
    };

    return (
        <p id="Num_Solved">{numTickets}</p>
    );
}

function Number1() {
    const [NumTickets, setNumTickets] = useState(0);

    useEffect(() => {
        fetchTicketCount();
    }, []);

    const fetchTicketCount = async () => {
        try {
            const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/getUnsolved_Tickets?');
            if (!response.ok) {
                throw new Error('Failed to fetch tickets count');
            }
            const data = await response.json();
            setNumTickets(data.length);
        } catch (error) {
            console.error('Error fetching tickets count:', error);
        }
    };

    return NumTickets;
}

export { Number1 };
export { UnsolvedValue }; // Export Value as a named export
export default Unsolved; // Export Residents as the default export
