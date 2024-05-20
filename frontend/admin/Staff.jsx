import React, { useState, useEffect } from 'react';

function Staff() {
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        fetchStaffData();
    }, []);

    const fetchStaffData = async () => {
        try {
            const response = await fetch('https://showresidents.azurewebsites.net/api/ShowStaff_?');
            if (!response.ok) {
                throw new Error('Failed to fetch staff data');
            }
            const data = await response.json();
            setStaffData(data);
        } catch (error) {
            console.error('Error fetching staff data:', error);
        }
    };

    return (
        <>
            {staffData.map((person, index) => (
                <div key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src="pp.png" alt="" />
                            <p className="name">
                                {person.Name}
                            </p>
                        </section>
                        <ul className="vC">
                            <li className="variables">{person.Email}</li>
                            <li className="variables">{person.Job}</li>
                            <li className="variables">{person.PropertyName}</li>
                        </ul>
                    </article>
                </div>
            ))}
        </>
    );
}

function StaffValue() {
    const [numStaff, setNumStaff] = useState('Loading...');

    useEffect(() => {
        fetchStaffCount();
    }, []);

    const fetchStaffCount = async () => {
        try {
            const response = await fetch('https://showresidents.azurewebsites.net/api/ShowStaff_?');
            if (!response.ok) {
                throw new Error('Failed to fetch staff data');
            }
            const data = await response.json();
            setNumStaff(data.length);
        } catch (error) {
            console.error('Error fetching staff data:', error);
        }
    };

    return (
        <p id="Num_stuff">{numStaff}</p>
    );
}

export { StaffValue }; // Export Value as a named export
export default Staff; // Export Staff as the default export
