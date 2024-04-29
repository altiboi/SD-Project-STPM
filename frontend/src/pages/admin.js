import logo from './logo.svg';
import { useState } from 'react';
import Residents, { Value } from './Residents';
import Staff, { StaffValue } from './Staff';
import './App.css';
import  total ,  {TicketsPop}  from './Tickets';
import Unsolved from './Unsolved';
import InProgress from './InProgress';
import Solved from './Solved';

function App() {
    // State variables if needed
    const [numResidents, setNumResidents] = useState(0);
    const [numTickets, setNumTickets] = useState(0);
    const [numStaff, setNumStaff] = useState(0);
    const [ticketsPopOpen, setTicketsPopOpen] = useState(false);
    const [ViewContain, setViewContain] = useState(false);

    const ResidentsHeader = () => {
        return (
            <nav id="ViewBoxnav" className='ViewBoxNav'>
                <h5>View Residents</h5>
                <section className="title">
                    <h4>Name</h4>
                    <ul>
                        <li>Age:</li>
                        <li>Room On:</li>
                        <li>Room Type:</li>
                    </ul>
                </section>
            </nav>
        );
    };

    const StaffHeader = () => {
        return (
            <nav id="ViewBoxnav" className='ViewBoxNav'>
                <h5>View Staff</h5>
                <section className="title">
                    <h4>Name</h4>
                    <ul>
                        <li>Email:</li>
                        <li>Role:</li>
                        <li>UnitID:</li>
                    </ul>
                </section>
            </nav>
        );
    };
    const UnsolvedHeader = () => {
        return (
            <nav id="ViewBoxnav" className='ViewBoxNav'>
                <h5>View Unsolved Tickets</h5>
                <section className="title">
                    <h4>Name</h4>
                    <ul>
                        <li>Subject:</li>
                        <li>Room On:</li>
                        <li>Time:</li>
                    </ul>
                </section>
            </nav>
        );
    };
    const InProgressHeader = () => {
        return (
            <nav id="ViewBoxnav" className='ViewBoxNav'>
                <h5>View InProgress Tickets</h5>
                <section className="title">
                    <h4>Name</h4>
                    <ul>
                        <li>Subject:</li>
                        <li>Room On:</li>
                        <li>Time:</li>
                    </ul>
                </section>
            </nav>
        );
    };
    const SolvedHeader = () => {
        return (
            <nav id="ViewBoxnav" className='ViewBoxNav'>
                <h5>View Solved Tickets</h5>
                <section className="title">
                    <h4>Name</h4>
                    <ul>
                        <li>Subject:</li>
                        <li>Room On:</li>
                        <li>Time:</li>
                    </ul>
                </section>
            </nav>
        );
    };

    const handleUnsolvedTicketsClick = () => {
        // Your logic for handling unsolved tickets click event
    };

    const handleInProgressTicketsClick = () => {
        // Your logic for handling in-progress tickets click event
    };

    const handleSolvedTicketsClick = () => {
        // Your logic for handling solved tickets click event
    };

    const handleTicketClick = () => {
        setTicketsPopOpen(true);
    };

    const handleCardClick = (cardType) => {
        if(cardType==='Unsolved' || cardType==='InProgress' || cardType==='Solved') {
            setTicketsPopOpen(false);   
        }
        setActiveCard(cardType);
        setViewContain(true);
    };

    const [activeCard, setActiveCard] = useState(null);

    return (
        <>
            <main id="main" className={ticketsPopOpen ? 'body_close' : ''}>
                <header>
                    <nav className="navigationbar">
                        <section className="sec">
                            <img src="business.png" alt="logo of the business" />
                            <h1>The business Name</h1>
                        </section>
                        <img id="pp" src="pp.png" alt="user" />
                        <i className="fa-solid fa-ellipsis-vertical" style={{ marginRight: '10px' }}></i>
                    </nav>
                </header>
                <article className="postnav">
                    <h2>The admin name</h2>
                    <section className="sec1">
                        <h3>Activities</h3>
                    </section>
                </article>
                <article className="Cards">
                    <section onClick={() => handleCardClick('Residents')} className="Card">
                        <article className="art">
                            <h4>View Residents</h4>
                            <i className="fa-solid fa-user-group"></i>
                        </article>
                        <Value />
                    </section>
                    <section onClick={handleTicketClick} className="Card">
                        <article className="art">
                            <h4>TICKETS</h4>
                            <i className="fa-solid fa-ticket"></i>
                        </article>
                       <total />
                    </section>
                    <section onClick={() => handleCardClick('Staff')} className="Card">
                        <article className="art">
                            <h4>View STAFF</h4>
                            <i className="fa-solid fa-user-helmet-safety"></i>
                        </article>
                        <StaffValue />
                    </section>
                </article>
                <article id="viewBox" className='viewBox'>
                    <section id="header" className="header">
                        {activeCard === 'Residents' && <ResidentsHeader />}
                        {activeCard === 'Staff' && <StaffHeader />}
                        {activeCard === 'Unsolved' && <UnsolvedHeader />}
                        {activeCard==='InProgress' && <InProgressHeader/>}
                        {activeCard==='Solved' && <SolvedHeader/>}
                    </section>
                    <section id="viewComp" className="viewComp">
                        {activeCard === 'Residents' && <Residents />}
                        {activeCard === 'Staff' && <Staff />}
                        {activeCard==='Unsolved' && <Unsolved/>}
                        {activeCard==='InProgress' && <InProgress/>}
                        {activeCard==='Solved' && <Solved/>}
                    </section>
                </article>
            </main>
            <TicketsPop isOpen={ticketsPopOpen} handleCardClick={handleCardClick}/>
           
        </>
    );
}

export default App;
