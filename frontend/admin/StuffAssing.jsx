import React, { useState, useEffect } from 'react';
import pp from './pp.png';

function StaffAssign({ TaskAssignedTo, TicketId, Id }) {
    console.log(Id)
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await fetch('https://showresidents.azurewebsites.net/api/ShowStaff_');
                if (!response.ok) {
                    throw new Error('Failed to fetch staff data');
                }
                const data = await response.json();
                setStaff(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    useEffect(() => {
        if (TicketId) {
            console.log("Selected Ticket ID breh:", TicketId); // Log to debug
        }
    }, [TicketId]);

    const assignTask = async (staffId, ticketId) => {
        // Log the parameters to check their values
        console.log("staffId:", staffId);
        console.log("ticketId:", ticketId);
    
        // Ensure ticketId is defined
        if (!ticketId) {
            console.log("Ticket ID is undefined. Skipping task assignment.");
            return;
        }
    
        try {
            console.log("Selected Ticket ID:", ticketId); // Log to debug
            console.log("Staff ID:", staffId); // Log to debug
    
            const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/Assign_task?', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticket_id: ticketId, staff_id: staffId }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to assign task');
            }
    
            const result = await response.json();
            console.log(result.message);
            TaskAssignedTo(staffId, ticketId);
        } catch (error) {
            console.error(error.message);
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(TicketId)

    return (
        <>
            {staff.map((person, index) => (
                <div key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src={pp} alt="" />
                            <p onClick={() => assignTask(person._id, Id)} className="name">
                                {person.Name}
                            </p>
                        </section>
                        <ul className="vC">
                            <li className="variables">{person.Status}</li>
                            <li className="variables">{person.Role}</li>
                            <li className="variables">{person.UnitID}</li>
                        </ul>
                    </article>
                </div>
            ))}
        </>
    );
}

export default StaffAssign;
