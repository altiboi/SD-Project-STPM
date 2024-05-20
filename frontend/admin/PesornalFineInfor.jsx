import React, { useState, useEffect } from "react";

function OwedAmount({ personName }) {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchFines = async () => {
            try {
                const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/fetchFines?');
                const data = await response.json();
                setResidents(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFines();
    }, []);

    const person = residents.find(person => person.Resident=== personName);

    if (!person) {
        return <p>No resident found with that ID.</p>;
    }

    let totalOwed = 0;
    const unpaidFines = person.Fines.filter(fine => fine.status === 'Unpaid');
    unpaidFines.forEach(fine => {
        totalOwed += fine.fine_amount;
    });

    return (
        <p>R{totalOwed}</p>
    );
}

function Settled_Fines_number({ personName }) {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchFines = async () => {
            try {
                const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/fetchFines?');
                const data = await response.json();
                setResidents(data);
            } catch (error) {
                console.error(error);
                // Handle error fetching fines
            }
        };
        fetchFines();
    }, []);

    const person = residents.find(person => person.Resident === personName);

    if (!person) {
        return <p>No resident found with that ID.</p>;
    }

    const settledFinesCount = person.Fines.filter(fine => fine.status === 'Paid').length;

    return (
        <p>{settledFinesCount}</p>
    );
}

function Unsettled_Fines_number({ personName }) {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchFines = async () => {
            try {
                const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/fetchFines?');
                const data = await response.json();
                setResidents(data);
            } catch (error) {
                console.error(error);
                // Handle error fetching fines
            }
        };
        fetchFines();
    }, []);

    const person = residents.find(person => person.Resident === personName);
    if (!person) {
        return <p>No resident found with that ID.</p>;
    }
    const unpaidFinesCount = person.Fines.filter(fine => fine.status === 'Unpaid').length;

    return (
        <p>{unpaidFinesCount}</p>
    );
}

export { Settled_Fines_number, Unsettled_Fines_number };
export default OwedAmount;
