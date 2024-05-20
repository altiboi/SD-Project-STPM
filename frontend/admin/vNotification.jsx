import React, { useState, useEffect } from "react";
import './vNotification.css';

function VNotification({ isOpen, close, IdPerson }) {
    const [residentData, setResidentData] = useState([]);

    useEffect(() => {
        fetchResidentData();
    }, []);

    const fetchResidentData = async () => {
        try {
            const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/getHistorical_notifs');
            if (!response.ok) {
                throw new Error('Failed to fetch resident data');
            }
            const data = await response.json();
            setResidentData(data);
        } catch (error) {
            console.error('Error fetching resident data:', error);
        }
    };

    // Filter resident data based on IdPerson
    const filteredData = residentData.filter(person => person._id === IdPerson);

    return (
        <article className={isOpen ? "vNotificationStructure" : "vNotificationStructure_close"}>
            {filteredData.map((person, index) => (
                <div key={index}>
                    <section className="vSection1">
                        <p className="vSubjectInput">{person.header}</p>
                        <p className="vx" onClick={() => close('NSs')}><p>x</p></p>
                    </section>
                    <section className="vSection2">
                        <section className="vTo">
                            <label htmlFor="vTo">SendTo</label>
                            <button type="vbutton">{person.recipient}</button>
                        </section>
                        <section className="vtime">
                            <p>{person.sendDate}</p>
                        </section>
                    </section>
                    <section className="vSection3">
                        <section className="vBody">
                            <p className="vBody_text">{person.body}</p>
                        </section>
                        <section className="vimg">
                            <section className="vchoose">
                                {/* Image upload functionality */}
                            </section>
                            <section className="vimage">
                                <img src={person.photo} alt="vNotification" style={{ maxWidth: '100%' }} />
                            </section>
                        </section>
                    </section>
                    <section className="vSection4">
                        <section className="vfrom">
                            <label htmlFor="vfrom">from:</label>
                            <p>{person.senderName}</p>
                        </section>
                    </section>
                </div>
            ))}
        </article>
    )
}

export default VNotification;
