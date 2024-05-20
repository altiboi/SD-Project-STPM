import React, { useState, useEffect } from 'react';
import pp from './pp.png';

function StaffAssign({ TaskAssignedTo, selectedTicketId }) {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Received selectedTicketId:", selectedTicketId); // Log to debug
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

    const assignTask = async (staffId, ticketId) => {
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

    return (
        <>
            {staff.map((person, index) => (
                <div key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src={pp} alt="" />
                            <p onClick={() => assignTask(person._id, selectedTicketId)} className="name">
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
