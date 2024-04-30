import React from 'react';
import pp from './pp.png'

const residents =[
    {
        "name": "Alex Johnson",
        "time": "2024-04-26T08:45:00Z",
        "status": "Urgent",
        "title": "Gas leak",
        "description": "There's a strong smell of gas in the kitchen.",
        "room_on": 501
    },
    {
        "name": "Eva Brown",
        "time": "2024-04-26T09:30:00Z",
        "status": "Not Urgent",
        "title": "Broken chair",
        "description": "One of the dining chairs has a broken leg.",
        "room_on": 502
    },
    {
        "name": "Michael Smith",
        "time": "2024-04-26T10:15:00Z",
        "status": "Urgent",
        "title": "Flooding",
        "description": "The bathroom is flooded due to a burst pipe.",
        "room_on": 503
    },
    {
        "name": "Sophie Davis",
        "time": "2024-04-26T11:00:00Z",
        "status": "Not Urgent",
        "title": "Clogged sink",
        "description": "The kitchen sink is clogged and draining slowly.",
        "room_on": 504
    },
    {
        "name": "David Miller",
        "time": "2024-04-26T12:00:00Z",
        "status": "Urgent",
        "title": "Electrical short circuit",
        "description": "There's a short circuit in the living room causing sparks.",
        "room_on": 505
    }
];


function InProgress( {handleTicket} ) {
    
 

    return (
        <>
            {residents.map((person, index) => (
                <div key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src={pp} alt="" />
                            <p onClick={() => handleTicket()} className="name">
                                {person.name}
                            </p>
                        </section>
                        <ul className="vC">
                            <li className="variables">{person.title}</li>
                            <li className="variables">{person.room_on}</li>
                            <li className="variables">{person.time}</li>
                        </ul>
                    </article>
                </div>
            ))}
        </>
    );
}

function InProgressValue() {
    return (
        <p id="Num_InProgress">{residents.length}</p>
    );
}
function number2(){
    return residents.length
}
export {number2};

export { InProgressValue }; // Export Value as a named export
export default InProgress; // Export Residents as the default export
