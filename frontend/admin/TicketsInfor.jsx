import React, { useState, useEffect } from 'react';
import pp from './pp.png';
import StaffAssign from './StuffAssing'; // Ensure the import path is correct

function TicketsInfor({ personName, handleTicket, ifAssignedClicked }) {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTicketId, setSelectedTicketId] = useState(null); // Initialize state

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await fetch('https://showresidents.azurewebsites.net/api/getUnsolved_Tickets?');
                if (!response.ok) {
                    throw new Error('Failed to fetch tickets data');
                }
                const data = await response.json();
                setResidents(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchResidents();
    }, []);

    const handleAssignClick = (status, ticketId, subject) => {
        setSelectedTicketId(ticketId);
        ifAssignedClicked(status, ticketId, subject);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const person = residents.find(person => person._id === personName);

    if (!person) {
        return <p>No resident found with that name.</p>;
    }

    return (
        <>
            <article>
                <section className="sect1">
                    <article className="head">
                        <img src={pp} id="image" alt="Profile" />
                        <h5 className="Caption">{person.ticket_subject}</h5>
                    </article>
                    <p>{person.dateOpened}</p>
                </section>
                <section className="sect2">
                    <p>{person.ticket_description}</p>
                </section>
                <section className="sect4">
                    <button onClick={() => handleAssignClick('Assigned', person._id, person.ticket_subject)}>Assign</button>
                </section>
            </article>
            {selectedTicketId && (
                <StaffAssign TaskAssignedTo={handleTicket} selectedTicketId={selectedTicketId} />
            )}
        </>
    );
}

export default TicketsInfor;
