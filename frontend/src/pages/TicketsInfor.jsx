import React from 'react';
import pp from './pp.png'
const residents =[
    {
        "id": 1,
        "name": "John Doe",
        "time": "2024-04-26T08:30:00Z",
        "status": "Urgent",
        "title": "Water leakage",
        "description": "Greetings! It seems we have an urgent matter at hand. Water is leaking from the ceiling in the kitchen, creating a rather soggy situation. It's imperative that we address this promptly to avoid further damage.",
        "room_on": 502
    },
    {
        "id": 2,
        "name": "Alice Smith",
        "time": "2024-04-26T09:15:00Z",
        "status": "Not Urgent",
        "title": "Broken window",
        "description": "Hello! We've encountered a small issue in the living room. One of the windows is cracked, allowing a gentle breeze to make its way indoors. While not an urgent matter, it would be wise to mend it soon before it worsens.",
        "room_on": 501
    },
    {
        "id": 3,
        "name": "Bob Johnson",
        "time": "2024-04-26T10:00:00Z",
        "status": "Urgent",
        "title": "Power outage",
        "description": "Good day! It appears we're facing an urgent situation as the entire house is without electricity. This outage demands immediate attention to restore power and ensure the comfort and safety of our residents.",
        "room_on": 503
    },
    {
        "id": 4,
        "name": "Emily Brown",
        "time": "2024-04-26T11:20:00Z",
        "status": "Not Urgent",
        "title": "Internet connectivity",
        "description": "Hey there! Our home office is currently experiencing an internet connectivity issue. While it's not urgent, a stable internet connection is essential for productivity. Let's troubleshoot this to get back online smoothly.",
        "room_on": 505
    },
    {
        "id": 5,
        "name": "Michael Wilson",
        "time": "2024-04-26T12:45:00Z",
        "status": "Urgent",
        "title": "Heating system malfunction",
        "description": "Greetings! It appears our heating system has decided to take an unexpected break, leaving us in the cold. We must address this urgent matter promptly to restore warmth and comfort within our premises.",
        "room_on": 504
    },
    {
        "id": 6,
        "name": "Sophia Taylor",
        "time": "2024-04-26T13:30:00Z",
        "status": "Not Urgent",
        "title": "Appliance repair needed",
        "description": "Hello! Our dishwasher seems to be expressing itself through rather unusual noises. Though not urgent, it's wise to investigate this matter and ensure our appliances are in good working order.",
        "room_on": 502
    },
    {
        "id": 7,
        "name": "David Martinez",
        "time": "2024-04-26T14:10:00Z",
        "status": "Urgent",
        "title": "Roof damage",
        "description": "Good day! It appears we have a rather serious situation on our hands. There's a leak in the roof, and water is making its way into the attic. Urgent action is needed to prevent further damage and ensure the safety of our property.",
        "room_on": 506
    },
    {
        "id": 8,
        "name": "Emma Anderson",
        "time": "2024-04-26T15:00:00Z",
        "status": "Not Urgent",
        "title": "Gardening service required",
        "description": "Hey there! It's time to give our backyard some TLC. The lawn needs mowing, and some plants could use a bit of trimming to keep our outdoor space looking vibrant and welcoming.",
        "room_on": 507
    },
    {
        "id": 9,
        "name": "James White",
        "time": "2024-04-26T16:20:00Z",
        "status": "Urgent",
        "title": "Security system malfunction",
        "description": "Greetings! It seems our security system is feeling a bit jumpy, as it keeps triggering alarms without cause. We must address this urgent matter swiftly to restore peace of mind and prevent unnecessary disturbances.",
        "room_on": 503
    },
    {
        "id": 10,
        "name": "Olivia Garcia",
        "time": "2024-04-26T17:45:00Z",
        "status": "Not Urgent",
        "title": "HVAC maintenance",
        "description": "Hello! It's time for a bit of routine maintenance on our HVAC system. While not urgent, regular checkups ensure optimal performance and efficiency, keeping our indoor environment comfortable year-round.",
        "room_on": 504
    }
]

;


function TicketsInfor({ personName, handleTicket, ifAssignedClicked }) {
    const person = residents.find(person => person.id == personName);

    if (!person) {
        return <p>No resident found with that name.</p>;
    }

    return (
        <>
            <article>
                <section className="sect1">
                    <article className="head">
                        <img src={pp} id="image" alt="Profile" />
                        <h5 className="Caption">{person.title}</h5>
                    </article>
                    <p>{person.time}</p>
                </section>
                <section className="sect2">
                    <p>
                        {person.description}
                    </p>
                </section>
                <section className="sect4">
                    <button onClick={() => ifAssignedClicked('Assigned',person.name,person.title)}>Assign</button>
                </section>
            </article>
        </>
    );
}

export default TicketsInfor; // Export Residents as the default export
