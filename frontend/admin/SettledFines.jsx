import React, { useState, useEffect } from "react";
import './UnsettledFine.css';

function SettledFine({ personName, isOpen, Close }) {
    const [residents, setResidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [settledFines, setSettledFines] = useState([]);

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

    useEffect(() => {
        const person = residents.find(person => person.Resident === personName);
        console.log(personName)
        console.log(person)

        if (!person) {
            setSettledFines([]);
            return;
        }

        const settledFines = person.Fines.filter(fine => fine.status === 'Paid');
        setSettledFines(settledFines);

        // Calculate total amount
        let totalAmount = 0;
        settledFines.forEach(fine => {
            totalAmount += fine.fine_amount;
        });
        setTotal(totalAmount);
    }, [residents, personName]);

    return (
        <>
            <article className={isOpen ? "FineArticle" : "FineArticle_close"}>
                <header className="head">
                    <h4>Settled Fines</h4>
                    <section onClick={() => { Close("Settled") }} className="add">
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>x</p>
                    </section>
                </header>
                <section className="All_Fines">
                    <section className="Head2">
                        <section className="name">
                            <p className="name">Reason</p>
                        </section>
                        <ul className="MoreInfor">
                            <li className="com">Date</li>
                            <li className="com">Amount</li>
                        </ul>
                    </section>
                    <section className="displayFines">
                        {settledFines.map((fine, index) => (
                            <section key={index} className="eachFine">
                                <section className="name">
                                    <p className="name">{fine.fine_reason}</p>
                                </section>
                                <ul className="MoreInfor">
                                    <li className="com">{fine.date_issued}</li>
                                    <li className="com">R{fine.fine_amount}</li>
                                </ul>
                            </section>
                        ))}
                    </section>
                </section>
                <section className="amoutInfor">
                    <section className="sectionn1">
                        <p>Total amount:<i className="fa-sharp fa-solid fa-circle-check"></i></p>
                    </section>
                    <section>
                        <p>R{total}</p>
                    </section>
                </section>
            </article>
        </>
    );
}

export default SettledFine;
