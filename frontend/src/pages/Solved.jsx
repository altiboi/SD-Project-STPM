import React from 'react';


const residents =[
    {
        "name": "Sophia Johnson",
        "time": "2024-04-26T08:00:00Z",
        "status": "Urgent",
        "title": "Gas leak",
        "description": "Strong smell of gas detected in the kitchen.",
        "room_on": 501
    },
    {
        "name": "Ethan Brown",
        "time": "2024-04-26T08:30:00Z",
        "status": "Not Urgent",
        "title": "Leaking faucet",
        "description": "The bathroom faucet is leaking continuously.",
        "room_on": 502
    },
    {
        "name": "Emma Smith",
        "time": "2024-04-26T09:00:00Z",
        "status": "Urgent",
        "title": "Broken window",
        "description": "Living room window shattered due to a storm.",
        "room_on": 503
    },
    {
        "name": "William Davis",
        "time": "2024-04-26T09:30:00Z",
        "status": "Not Urgent",
        "title": "Pest infestation",
        "description": "Ants found in the kitchen cabinets.",
        "room_on": 504
    },
    {
        "name": "Olivia Martinez",
        "time": "2024-04-26T10:00:00Z",
        "status": "Urgent",
        "title": "Power outage",
        "description": "Entire house without electricity.",
        "room_on": 505
    },
    {
        "name": "Noah Taylor",
        "time": "2024-04-26T10:30:00Z",
        "status": "Not Urgent",
        "title": "Malfunctioning thermostat",
        "description": "Temperature control not working in the living room.",
        "room_on": 506
    },
    {
        "name": "Ava Wilson",
        "time": "2024-04-26T11:00:00Z",
        "status": "Urgent",
        "title": "Broken door lock",
        "description": "Front door lock jammed, unable to open.",
        "room_on": 507
    },
    {
        "name": "James Garcia",
        "time": "2024-04-26T11:30:00Z",
        "status": "Not Urgent",
        "title": "Cracked ceiling",
        "description": "Cracks noticed in the bedroom ceiling.",
        "room_on": 508
    },
    {
        "name": "Isabella Rodriguez",
        "time": "2024-04-26T12:00:00Z",
        "status": "Urgent",
        "title": "Fridge malfunction",
        "description": "Fridge not cooling properly in the kitchen.",
        "room_on": 509
    },
    {
        "name": "Logan Lopez",
        "time": "2024-04-26T12:30:00Z",
        "status": "Not Urgent",
        "title": "Leaking dishwasher",
        "description": "Water leaking from the dishwasher in the kitchen.",
        "room_on": 510
    },
    {
        "name": "Charlotte Hernandez",
        "time": "2024-04-26T13:00:00Z",
        "status": "Urgent",
        "title": "Roof damage",
        "description": "Leak detected in the attic during heavy rain.",
        "room_on": 511
    },
    {
        "name": "Mia Gonzalez",
        "time": "2024-04-26T13:30:00Z",
        "status": "Not Urgent",
        "title": "Broken fence",
        "description": "Backyard fence partially collapsed.",
        "room_on": 512
    },
    {
        "name": "Lucas Perez",
        "time": "2024-04-26T14:00:00Z",
        "status": "Urgent",
        "title": "Smoke detector malfunction",
        "description": "Constant beeping from the smoke detector in the hallway.",
        "room_on": 513
    },
    {
        "name": "Harper Flores",
        "time": "2024-04-26T14:30:00Z",
        "status": "Not Urgent",
        "title": "Garden maintenance",
        "description": "Overgrown plants in the backyard need trimming.",
        "room_on": 514
    },
    {
        "name": "Benjamin Ramirez",
        "time": "2024-04-26T15:00:00Z",
        "status": "Urgent",
        "title": "Broken stairs",
        "description": "One of the stairs leading to the basement is cracked.",
        "room_on": 515
    },
    {
        "name": "Luna Torres",
        "time": "2024-04-26T15:30:00Z",
        "status": "Not Urgent",
        "title": "HVAC maintenance",
        "description": "Heating system needs a routine checkup in the basement.",
        "room_on": 516
    },
    {
        "name": "Mason Washington",
        "time": "2024-04-26T16:00:00Z",
        "status": "Urgent",
        "title": "Burst pipe",
        "description": "Water flooding in the basement due to a burst pipe.",
        "room_on": 517
    },
    {
        "name": "Amelia Wood",
        "time": "2024-04-26T16:30:00Z",
        "status": "Not Urgent",
        "title": "Wall paint peeling",
        "description": "Paint peeling off in the hallway needs repainting.",
        "room_on": 518
    },
    {
        "name": "Henry Scott",
        "time": "2024-04-26T17:00:00Z",
        "status": "Urgent",
        "title": "Broken toilet",
        "description": "Toilet in the bathroom not flushing properly.",
        "room_on": 519
    },
    {
        "name": "Emily Lee",
        "time": "2024-04-26T17:30:00Z",
        "status": "Not Urgent",
        "title": "Window screen torn",
        "description": "Window screen torn in the bedroom, needs replacement.",
        "room_on": 520
    }
];


function Solved() {
    
 

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
