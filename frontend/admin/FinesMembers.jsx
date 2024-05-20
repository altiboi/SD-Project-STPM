import React, { useState, useEffect } from 'react';
import pp from './pp.png';

function FinesMembers({filterLetters, handleTicketClick }) {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/fetchFines?');
                const data = await response.json();
                console.log(data)
                setResidents(data);
            } catch (error) {
                console.error('Error fetching fines:', error);
            }
        };
        fetchData();
    }, []);


    const filterResidents = (residents, filterLetters) => {
        if (!filterLetters) {
            return residents; 
        }
        const filteredResidents = residents.filter(person =>
            person.Resident.toLowerCase().includes(filterLetters.toLowerCase())
        );
        return filteredResidents;
    };

    const filteredResidents = filterResidents(residents, filterLetters);

    return (
        <>
            {filteredResidents.map((person, index) => {
                const unpaidFinesCount = person.Fines.filter(fine => fine.status === 'Unpaid').length;
                const paidFinesCount = person.Fines.filter(fine => fine.status === 'Paid').length;

                return (
                    <div key={index} className="comp">
                        <article className="insComp">
                            <section className="profile">
                                <img src={pp} alt="" />
                                <p onClick={() => { handleTicketClick('Fines', person.Resident) }} className="name">
                                    {person.Resident}
                                </p>
                            </section>
                            <ul className="vC">
                                <li className="variables">{unpaidFinesCount}</li>
                                <li className="variables">{paidFinesCount}</li>
                                <li className="variables">{person.Name}</li>
                            </ul>
                        </article>
                    </div>
                );
            })}
        </>
    );
}

function NumberOfFined({ residents }) {
    if (!residents) return null; // Check if residents is defined
    return (
        <p id="Num_res">{residents.length}</p>
    );
}

export { FinesMembers, NumberOfFined };
export default FinesMembers;
