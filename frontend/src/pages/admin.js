import logo from './logo.svg';
import { useState } from 'react';
import Residents, { Value } from './Residents';
import Staff, { StaffValue } from './Staff';
import './App.css';
import  total ,  {TicketsPop}  from './Tickets';
import Unsolved from './Unsolved';
import InProgress from './InProgress';
import Solved from './Solved';
import TheTicket from './TheTicket';
import pp from './pp.png'
import business from './images/bus.png'
import StaffAssign from './StuffAssing'
import TaskAssigned from './TaskAssigned';

function App() {
    // State variables if needed
    const [numResidents, setNumResidents] = useState(0);
    const [numTickets, setNumTickets] = useState(0);
    const [numStaff, setNumStaff] = useState(0);
    const [ticketsPopOpen, setTicketsPopOpen] = useState(false);
    const [TicketOpen, setTicketOpen] = useState(false);
    const [ViewContain, setViewContain] = useState(false);
    const [NamePerson, setName] = useState(null);
    const [NamePerson1, setName1] = useState(null);
    const [title, setTitle] = useState(null);
    const [isAssigned, setIsAssignd] = useState(false);
    const [StaffName, setStaffName] = useState(null);
    const [taskAssigned, istaskAssigned] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [formattedTime,setformattedTime]=useState(null);
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
    const StaffAssingHeader = () => {
        return (
            <nav id="viewBocNav" className='ViewBoxNav'>
                <h5>Choose a staff member to assign a task</h5>
                <section className="title">
                    <h4>Name</h4>
                    <ul>
                        <li>Status:</li>
                        <li>Role:</li>
                        <li>UnitID:</li>
                    </ul>
                </section>
            </nav>
        );
    };
    const ifAssignedClicked = (task, name, title) => {
        handleCardClick(task);
        setName1(name);
        setTitle(title);
    };

    const TaskAssignedTo = (name) => {
        setStaffName(name);
        setIsAssignd(true);
        istaskAssigned(true)
    };

    const handleSolvedTicketsClick = () => {
        // Your logic for handling solved tickets click event
    };

    const handleTicketClick = () => {
        setTicketsPopOpen(true);
    };
    const handleTicket = (name) => {
        setName(name);
        setTicketOpen(true);
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString();
        setCurrentTime(currentTime);
        setformattedTime(formattedTime);
        
        
    };
    const close = () => {
      istaskAssigned(false);
      setIsAssignd(false)
        
        
    };

    const handleCardClick = (cardType) => {
        if(cardType==='Unsolved' || cardType==='InProgress' || cardType==='Solved') {
            setTicketsPopOpen(false);   
        }
        if(cardType==='Assigned'){
            setTicketOpen(false);
        }
        setActiveCard(cardType);
        setViewContain(true);
    };

    const [activeCard, setActiveCard] = useState(null);

    return (
        <body>
            <main id="main" className={ticketsPopOpen || TicketOpen || taskAssigned ? 'body_close' : ''}>
                <header>
                    <nav className="navigationbar">
                        <section className="sec">
                            <img src={business} alt="logo of the business" />
                            <h1>The business Name</h1>
                        </section>
                        <img id="pp" src={pp} alt="user" />
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
                        {activeCard==='Assigned' && <StaffAssingHeader/>}
                    </section>
                    <section id="viewComp" className="viewComp">
                        {activeCard === 'Residents' && <Residents />}
                        {activeCard === 'Staff' && <Staff  />}
                        {activeCard==='Unsolved' && <Unsolved handleTicket={handleTicket}/>}
                        {activeCard==='InProgress' && <InProgress handleTicket={handleTicket}/>}
                        {activeCard==='Solved' && <Solved handleTicket={handleTicket}/>}
                        {activeCard==='Assigned' && <StaffAssign TaskAssignedTo={TaskAssignedTo}/>}
                    </section>
                </article>
            </main>
            <TicketsPop isOpen={ticketsPopOpen} handleCardClick={handleCardClick}/>
            <TheTicket isClicked={TicketOpen}  name={NamePerson} handleCardClick={ifAssignedClicked}/>
            <TaskAssigned time={formattedTime } close={close} RequestedBy={NamePerson1} TaskName={title} AssignedTo={StaffName} isAssigned={isAssigned}/>
       </body>
    );
}

export default App;
