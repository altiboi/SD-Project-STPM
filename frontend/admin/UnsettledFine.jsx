import React, { useState, useEffect } from "react";
import './UnsettledFine.css';

function UnsettledFine({ personName, isOpen, Close, Open }) {
    const [residents, setResidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [unsettledFines, setUnsettledFines] = useState([]);

    useEffect(() => {
        const fetchFines = async () => {
            try {
                const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/fetchFines?');
                const data = await response.json();
                console.log(data)
                setResidents(data);
            } catch (error) {
                console.error(error);
                // Handle error fetching fines
            }
        };
        fetchFines();
    }, []);

    useEffect(() => {
        if (!residents || residents.length === 0) return;

        const person = residents.find(person => person.Resident === personName);
        console.log(personName)
        console.log(person)

        if (!person) {
            setUnsettledFines([]);
            return;
        }

        const unsettledFines = person.Fines.filter(fine => fine.status === 'Unpaid');
        setUnsettledFines(unsettledFines);

        // Calculate total amount
        let totalAmount = 0;
        unsettledFines.forEach(fine => {
            totalAmount += fine.fine_amount;
        });
        setTotal(totalAmount);
    }, [residents, personName]);

    return (
        <>
            <article className={isOpen ? "FineArticle" : "FineArticle_close"}>
                <header className="head">
                    <h4>Unsettled Fines</h4>
                    <section onClick={() => Close("Unsettled")} className="add">
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
                        {unsettledFines.map((fine, index) => (
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
                    <section onClick={() => Open('creatFine')} className="add">
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>+</p>
                        <p style={{ fontSize: '10px', fontWeight: 'bold' }}>create</p>
                    </section>
                </section>
            </article>
        </>
    );
}

export default UnsettledFine;
