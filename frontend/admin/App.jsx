
import { useState } from 'react';
import Residents, { Value } from './Residents';
import Staff, { StaffValue } from './Staff';
import './App.css';
import  total ,  {TicketsPop}  from './Tickets';
import Unsolved from './Unsolved';
import InProgress from './InProgress';
import Solved from './Solved';
import TheTicket from './TheTicket';
import Search from './search';
import pp from './pp.png'
import business from './images/bus.png'
import StaffAssign from './StuffAssing'
import TaskAssigned from './TaskAssigned';
import SideBar from './SideBar';
import SignUpForm from './SignUpForm';
import Cards from './Cards';
import CardsHome,{CardsTask} from './Cards';
import FinesMembers from './FinesMembers';
import FinePop  from './FinePop';
import UnsettledFine from './UnsettledFine';
import report from './report';
import SettledFine from './SettledFines';
import CreateFine from './CreateFine';
import {NumberOfFined}from './FinesMembers';
import NotificationPop from './notificationPop';
import AllNotification from './AllNotification';
import NotificationStructure from './NotificationStructure';
import SendTo from './SendTo';
import VNotification from './vNotification';

function App() {
    const [searchText,setSearchText]=useState(null);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
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
    const [activeCard, setActiveCard] = useState(null);
    const [SideOpen, setSideOpen] = useState(false);
    const [WhichActivity,setWhichActivity]=useState('home');
    const [FineTicketOpen,setFineTicketOpen]=useState(false);
    const [FineMember,setFineMember]=useState(null);
    const [UnsettledPop,setUnsettledPop]=useState(false);
    const [SettledPop,setSettledPop]=useState(false);
    const [main ,setMain]=useState(false)
    const [createFinePop,setCreateFinePop]=useState(false);
    const [SeachOpen, setSeachOpen]=useState(false);
    const [notificationPop,setNotificationPop]=useState(false);
    const [notificationCreate,setNotificationCreate]=useState(false);
    const [choosenInput,setChoosenInput]=useState(null);
    const [dropDownmenu,setDropDownmenu]=useState(false)
    const [myNotification,setMyNotification]=useState(false);
    const [notificationId,setNotificationId]=useState(null);

    
    const openSignUp = () => {
        setIsSignUpOpen(true);
    };

    const closeSignUp = () => {
        setIsSignUpOpen(false);
    };
    const ResidentsHeader = () => {
        return (
            <nav id="ViewBoxnav" className='ViewBoxNav'>
                <h5>Residents</h5>
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
    const HistoryHeader = () => {
        return (
            <nav id="ViewBoxnav" className='ViewBoxNav'>
                <h5>Notifications History</h5>
                <section className="title">
                    <h4>Name</h4>
                    <ul>
                        <li>To:</li>
                        <li>Date:</li>
                        <li></li>
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
        setMain(true)
    };
    const handleNotificationClick=(name,NamePerson)=>{
        if(name=="MyN"){
            setNotificationId(NamePerson);
            setMyNotification(true);
            setMain(true)
        }
    }
    const handleTicketClick = (name,NamePerson) => {
        if(name==='tickets'){
            setTicketsPopOpen(true);
            setMain(true)
        }else{
            setSeachOpen(false);
            setFineTicketOpen(true);
            setMain(true)
        }
       setFineMember(NamePerson);
    };
    const handleTicket = (name) => {
        setName(name);
        setTicketOpen(true);
        setMain(true)
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString();
        setCurrentTime(currentTime);
        setformattedTime(formattedTime); 
    };
    const close = () => {
      istaskAssigned(false);
      setIsAssignd(false)    
      setMain(false)
    };
    const handleCardClick = (cardType) => {
        if(cardType==='Unsolved' || cardType==='InProgress' || cardType==='Solved') {
            setTicketsPopOpen(false);  
            setMain(false) 
        }
        if(cardType==='Unsettled' || cardType==='Settled'){
            setFineTicketOpen(false);
            setMain(false)
            if(cardType==='Unsettled'){
                setUnsettledPop(true);
                setMain(true)
            }else{
                setSettledPop(true);
                setMain(true)
            }
        }
        if(cardType==='Assigned'){
            setTicketOpen(false);
            setMain(false)
        }
        if (cardType==="Fines"){
            setSeachOpen(true);
        }
        setActiveCard(cardType);
        setViewContain(true);

        if(cardType==="Notifications"){
            setNotificationPop(true);
            setActiveCard(cardType);
            setMain(true);
        }

        if(cardType==="History"){
            setNotificationPop(false);
            setMain(false)
        }
        if(cardType==="cNotification"){
            setNotificationCreate(true);
            setNotificationPop(false);
            setMain(true);
        }
        if(cardType==="dropDown"){
            setDropDownmenu(true);
        }
        if(cardType==="MyN"){
            setMyNotification(true);
        }


    };

    const OpenSideBar=()=>{
        setSideOpen(true);
        setMain(true)

    }
    const Close=(name)=>{
        if(name=='SideBar'){
            setSideOpen(false);
            setMain(false)
            
        }
        if(name=="Unsettled"){
            setUnsettledPop(false);
            setMain(false)
        }
        if(name=="Settled"){
            setSettledPop(false);
            setMain(false)
        }
        if(name=="Assigned"){
            setIsAssignd(false);
            istaskAssigned(false)
            setMain(false)
        }
        if(name=='CreateFine'){
            setCreateFinePop(false);
            setMain(false)
        }
        if(name=="NS"){
            setNotificationCreate(false);
            setMain(false);
        }
        if(name=="NSs"){
            setMyNotification(false);
            setMain(false);
        }
       

    }
    const Open=(name)=>{
        if(name=='creatFine'){
            setCreateFinePop(true);
            setUnsettledPop(false);
            setMain(true)
        }
    }
    const ViewActivits=(name)=>{
        setWhichActivity(name);
        Close("SideBar");
    }
    const DropDown=(name)=>{
        setDropDownmenu(false);
        setChoosenInput(name);
    }
    return (
        <body>
            <main id="main" className={main? 'body_close' : ''}>
    
                <article className="postnav">
                    <section className='heading'>
                        <p onClick={()=>{OpenSideBar()}}>O</p>
                        <h2>The admin name</h2>
                    </section>
                    <section className="sec1">
                        <h3>Activities</h3>
                    </section>
                </article>
                { WhichActivity=='home' && <CardsHome handleCardClick={handleCardClick} handleTicketClick={handleTicketClick}/>}
                { WhichActivity=='task' && <CardsTask handleCardClick={handleCardClick} handleTicketClick={handleTicketClick} openSignUp={openSignUp}/>}
                <article id="viewBox" className='viewBox'>
                    <section id="header" className="header">
                        {activeCard === 'Residents' && <ResidentsHeader />}
                        {activeCard === 'Staff' && <StaffHeader />}
                        {activeCard === 'Unsolved' && <UnsolvedHeader />}
                        {activeCard==='InProgress' && <InProgressHeader/>}
                        {activeCard==='Solved' && <SolvedHeader/>}
                        {activeCard==='Assigned' && <StaffAssingHeader/>}
                        {activeCard === 'Fines' && <ResidentsHeader />}
                        {activeCard === 'History' && <HistoryHeader />}
                    </section>
                    <section id="viewComp" className="viewComp">
                        {activeCard === 'Residents' && <Residents />}
                        {activeCard === 'Staff' && <Staff  />}
                        {activeCard==='Unsolved' && <Unsolved handleTicket={handleTicket}/>}
                        {activeCard==='InProgress' && <InProgress handleTicket={handleTicket}/>}
                        {activeCard==='Solved' && <Solved handleTicket={handleTicket}/>}
                        {activeCard==='Assigned' && <StaffAssign TaskAssignedTo={TaskAssignedTo}/>}
                        {activeCard=='History'  && <AllNotification handleNotificationClick={handleNotificationClick}/>}
                        {activeCard==='Fines' && <FinesMembers filterLetters={searchText}  handleTicketClick={handleTicketClick}/>}

                        
                    </section>
                </article>
            </main>
            <TicketsPop isOpen={ticketsPopOpen} handleCardClick={handleCardClick}/>
            <TheTicket isClicked={TicketOpen}  name={NamePerson} handleCardClick={ifAssignedClicked}/>
            <TaskAssigned time={formattedTime } close={Close}  RequestedBy={NamePerson1} TaskName={title} AssignedTo={StaffName} isAssigned={isAssigned}/>
            <SideBar isOpen={SideOpen} CloseSideBar={Close} ViewActivits={ViewActivits}/>
            <FinePop isFineTicketOpen={FineTicketOpen} personName={FineMember} handleCardClick={handleCardClick}/>
            <UnsettledFine personName={FineMember} isOpen={UnsettledPop} Close={Close} Open={Open}/>
            <SettledFine personName={FineMember} isOpen={SettledPop} Close={Close} />
            <CreateFine  isOpen={createFinePop} Close={Close} resident={FineMember}/>
            <SignUpForm isOpen={isSignUpOpen} closeSignUp={closeSignUp} />
            <Search setSearchText={setSearchText} isOpen={(SeachOpen)}/>
            <NotificationPop isOpen={notificationPop} handleCardClick={handleCardClick}/>
            <NotificationStructure isOpen={notificationCreate} choosen={choosenInput} handleCardClick={handleCardClick} close={Close}/>
            <SendTo dropDownClick={DropDown} isOpen={dropDownmenu}/>
            <VNotification isOpen={myNotification} IdPerson={notificationId} close={Close}/>
       </body>
    );
}

export default App;
