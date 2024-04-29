import React from 'react';


const residents =[
    {
        "name": "John Doe",
        "time": "2024-04-26T08:30:00Z",
        "status": "Urgent",
        "title": "Water leakage",
        "description": "Water is leaking from the ceiling in the kitchen.",
        "room_on": 502
    },
    {
        "name": "Alice Smith",
        "time": "2024-04-26T09:15:00Z",
        "status": "Not Urgent",
        "title": "Broken window",
        "description": "A window in the living room is cracked.",
        "room_on": 501
    },
    {
        "name": "Bob Johnson",
        "time": "2024-04-26T10:00:00Z",
        "status": "Urgent",
        "title": "Power outage",
        "description": "The entire house is without electricity.",
        "room_on": 503
    },
    {
        "name": "Emily Brown",
        "time": "2024-04-26T11:20:00Z",
        "status": "Not Urgent",
        "title": "Internet connectivity",
        "description": "There's no internet connection in the home office.",
        "room_on": 505
    },
    {
        "name": "Michael Wilson",
        "time": "2024-04-26T12:45:00Z",
        "status": "Urgent",
        "title": "Heating system malfunction",
        "description": "The heating system is not working, and it's very cold inside.",
        "room_on": 504
    },
    {
        "name": "Sophia Taylor",
        "time": "2024-04-26T13:30:00Z",
        "status": "Not Urgent",
        "title": "Appliance repair needed",
        "description": "The dishwasher is making strange noises.",
        "room_on": 502
    },
    {
        "name": "David Martinez",
        "time": "2024-04-26T14:10:00Z",
        "status": "Urgent",
        "title": "Roof damage",
        "description": "There's a leak in the roof, and water is coming into the attic.",
        "room_on": 506
    },
    {
        "name": "Emma Anderson",
        "time": "2024-04-26T15:00:00Z",
        "status": "Not Urgent",
        "title": "Gardening service required",
        "description": "The lawn needs mowing, and some plants need trimming.",
        "room_on": 507
    },
    {
        "name": "James White",
        "time": "2024-04-26T16:20:00Z",
        "status": "Urgent",
        "title": "Security system malfunction",
        "description": "The security alarm keeps going off for no apparent reason.",
        "room_on": 503
    },
    {
        "name": "Olivia Garcia",
        "time": "2024-04-26T17:45:00Z",
        "status": "Not Urgent",
        "title": "HVAC maintenance",
        "description": "It's time for the regular maintenance check of the HVAC system.",
        "room_on": 504
    }
];


function Unsolved() {
    
 

    return (
        <>
            {residents.map((person, index) => (
                <div key={index} className="comp">
                    <article className="insComp">
                        <section className="profile">
                            <img src="pp.png" alt="" />
                            <p className="name">
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

function UnsolvedValue() {
    return (
        <p id="Num_Solved">{residents.length}</p>
    );
}
function number1(){
    return residents.length ;
}
export {number1};
export { UnsolvedValue }; // Export Value as a named export
export default Unsolved; // Export Residents as the default export
