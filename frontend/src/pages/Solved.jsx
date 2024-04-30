import React from 'react';
import pp from './pp.png'
const residents =[
    {
        "id": 1,
        "name": "Sophia Mkhize",
        "time": "2024-04-26T08:00:00Z",
        "status": "Urgent",
        "title": "Gas leak",
        "description": "Greetings! I hope this message finds you well. I'm writing to inform you about a concerning issue in my kitchen. There's a strong smell of gas detected, and I fear it might be a gas leak. It's imperative to address this immediately for safety reasons. Your prompt attention to this matter is greatly appreciated. Thank you.",
        "room_on": 501
    },
    {
        "id": 2,
        "name": "Ethan Brown",
        "time": "2024-04-26T08:30:00Z",
        "status": "Not Urgent",
        "title": "Leaking faucet",
        "description": "Hello! I trust you're doing well. I'm reaching out to report a persistent issue with the bathroom faucet. It's been leaking continuously, causing inconvenience and wasting water. While not urgent, it would be appreciated if this could be fixed at your earliest convenience. Thank you for your attention to this matter.",
        "room_on": 502
    },
    {
        "id": 3,
        "name": "Emma Smith",
        "time": "2024-04-26T09:00:00Z",
        "status": "Urgent",
        "title": "Broken window",
        "description": "Dear Management, I hope this message finds you well. Unfortunately, I have to report a troubling incident. During a recent storm, the living room window shattered, posing a safety risk and allowing the elements to enter the house. Urgent action is needed to secure the window and ensure the safety of the residents. Your prompt attention to this matter is highly appreciated. Thank you.",
        "room_on": 503
    },

]
;


function Solved({handleTicket}) {
    
    return (
        <>
            {residents.map((person, index) => (
                <section key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src={pp} alt="" />
                            <p onClick={() => handleTicket(person.id)}  className="name">
                                {person.name}
                            </p>
                        </section>
                        <ul className="vC">
                            <li className="variables">{person.title}</li>
                            <li className="variables">{person.room_on}</li>
                            <li className="variables">{person.time}</li>
                        </ul>
                    </article>
                </section>
            ))}
             
        </>
     
    );
}

function SolvedValue() {
    return (
        <p id="Num_solved">{residents.length}</p>
    );
}
function number3(){
    return residents.length
}
export {number3};

export { SolvedValue }; // Export Value as a named export
export default Solved; // Export Residents as the default export
