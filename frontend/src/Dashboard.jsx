import "./Dashboard.css";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Profile from "./pages/Login/Profile";
import Table from "./pages/Staff/Table";
import Modal from "./pages/Staff/Modal";
import Table1 from "./pages/Residents/Table1";
import Modal1 from "./pages/Residents/Modal1";
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState, useEffect } from "react";
import Loading from "./components/Loading";
import { bufferToImage } from "face-api.js";
import TicketReport from "./components/TicketReport";
import FineReport from "./components/FineReport";
import Fines from "./pages/Residents/Fines";
import PaymentModal from "./pages/Residents/PaymentModal";
import Notifications from "./components/Notifications";
import NotificationsModal from "./components/NotificationsModal";
import { ResidentsValue } from "../admin/Residents";
import Residents from "../admin/Residents";
import { StaffValue } from "../admin/Staff";
import Staff from "../admin/Staff";
import { NumberOfFined } from "../admin/FinesMembers";
import CardsHome, { CardsTask } from "../admin/Cards";

// Admin Imports

import total, { TicketsPop } from "../admin/Tickets";
import Unsolved from "../admin/Unsolved";
import InProgress from "../admin/InProgress";
import Solved from "../admin/Solved";
import TheTicket from "../admin/TheTicket";
import Search from "../admin/search";
//import pp from "../admin/pp.png";
import business from "../admin/images/bus.png";
import StaffAssign from "../admin/StuffAssing";
import TaskAssigned from "../admin/TaskAssigned";
import SideBar from "../admin/SideBar";
import SignUpForm from "../admin/SignUpForm";
import Cards from "../admin/Cards";
import FinesMembers from "../admin/FinesMembers";
import FinePop from "../admin/FinePop";
import UnsettledFine from "../admin/UnsettledFine";
import report from "../admin/report";
import SettledFine from "../admin/SettledFines";
import CreateFine from "../admin/CreateFine";
import NotificationPop from "../admin/notificationPop";
import AllNotification from "../admin/AllNotification";
import NotificationStructure from "../admin/NotificationStructure";
import SendTo from "../admin/SendTo";
import VNotification from "../admin/vNotification";

function Dashboard() {
  const navRef = useRef();
  const [dashboardActiveLinkIdx, setDashboardActiveLinkIdx] = useState(0);
  const { user, logout, isAuthenticated } = useAuth0();
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState({
    user_id: null,
    role: null,
    phoneNumber: null,
    propName: null,
    name: null,
    unitID: null,
    lastLogin: null,
  });

  //popup useStates

  const notificationPopRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationPopRef.current &&
        !notificationPopRef.current.contains(event.target)
      ) {
        setNotificationPop(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //Admin states

  const [searchText, setSearchText] = useState(null);
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
  const [formattedTime, setformattedTime] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [SideOpen, setSideOpen] = useState(false);
  const [WhichActivity, setWhichActivity] = useState(null);
  const [FineTicketOpen, setFineTicketOpen] = useState(false);
  const [FineMember, setFineMember] = useState(null);
  const [UnsettledPop, setUnsettledPop] = useState(false);
  const [SettledPop, setSettledPop] = useState(false);
  const [main, setMain] = useState(false);
  const [createFinePop, setCreateFinePop] = useState(false);
  const [SeachOpen, setSeachOpen] = useState(false);
  const [notificationPop, setNotificationPop] = useState(false);
  const [notificationCreate, setNotificationCreate] = useState(false);
  const [choosenInput, setChoosenInput] = useState(null);
  const [dropDownmenu, setDropDownmenu] = useState(false);
  const [myNotification, setMyNotification] = useState(false);
  const [notificationId, setNotificationId] = useState(null);

  //Admin Functions

  const openSignUp = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };
  const ResidentsHeader = () => {
    return (
      <nav id="ViewBoxnav" className="ViewBoxNav">
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
      <nav id="ViewBoxnav" className="ViewBoxNav">
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
      <nav id="ViewBoxnav" className="ViewBoxNav">
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
      <nav id="ViewBoxnav" className="ViewBoxNav">
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
      <nav id="ViewBoxnav" className="ViewBoxNav">
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
      <nav id="ViewBoxnav" className="ViewBoxNav">
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
      <nav id="viewBocNav" className="ViewBoxNav">
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
    istaskAssigned(true);
    setMain(true);
  };
  const handleNotificationClick = (name, NamePerson) => {
    if (name == "MyN") {
      setNotificationId(NamePerson);
      setMyNotification(true);
      setMain(true);
    }
  };
  const handleTicketClick = (name, NamePerson) => {
    if (name === "tickets") {
      setTicketsPopOpen(true);
      setSeachOpen(false);
      setMain(true);
    } else {
      setSeachOpen(false);
      setFineTicketOpen(true);
      setMain(true);
    }
    setFineMember(NamePerson);
  };
  const handleTicket = (name) => {
    setName(name);
    setTicketOpen(true);
    setMain(true);
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString();
    setCurrentTime(currentTime);
    setformattedTime(formattedTime);
  };
  const close = () => {
    istaskAssigned(false);
    setIsAssignd(false);
    setMain(false);
  };
  const handleCardClick = (cardType) => {
    if (
      cardType === "Unsolved" ||
      cardType === "InProgress" ||
      cardType === "Solved"
    ) {
      setTicketsPopOpen(false);
      setMain(false);
    }

    if (cardType === "Residents") {
      setSeachOpen(true);
      setSearchText(null);
    }
    if (cardType === "Staff") {
      setSeachOpen(true);
      setSearchText(null);
    }
    if (cardType === "Unsettled" || cardType === "Settled") {
      setFineTicketOpen(false);
      setMain(false);
      if (cardType === "Unsettled") {
        setUnsettledPop(true);
        setMain(true);
      } else {
        setSettledPop(true);
        setMain(true);
      }
    }
    if (cardType === "Assigned") {
      setTicketOpen(false);
      setMain(false);
    }
    if (cardType === "Fines") {
      setSeachOpen(true);
      setSearchText(null);
    }
    setActiveCard(cardType);
    setViewContain(true);

    if (cardType === "Notifications") {
      setNotificationPop(true);
      setSeachOpen(false);
      setSearchText(null);

      setActiveCard(cardType);
      setMain(true);
    }

    if (cardType === "History") {
      setNotificationPop(false);
      setMain(false);
    }
    if (cardType === "cNotification") {
      setNotificationCreate(true);
      setNotificationPop(false);
      setMain(true);
    }
    if (cardType === "dropDown") {
      setDropDownmenu(true);
    }
    if (cardType === "MyN") {
      setMyNotification(true);
    }
  };

  const Close = (name) => {
    if (name == "Unsettled") {
      setUnsettledPop(false);
      setMain(false);
    }
    if (name == "Settled") {
      setSettledPop(false);
      setMain(false);
    }
    if (name == "Assigned") {
      setIsAssignd(false);
      istaskAssigned(false);
      setMain(false);
    }
    if (name == "CreateFine") {
      setCreateFinePop(false);
      setMain(false);
    }
    if (name == "NS") {
      setNotificationCreate(false);
      setMain(false);
    }
    if (name == "NSs") {
      setMyNotification(false);
      setMain(false);
    }
  };
  const Open = (name) => {
    if (name == "creatFine") {
      setCreateFinePop(true);
      setUnsettledPop(false);
      setMain(true);
    }
  };
  const ViewActivits = (name) => {
    setWhichActivity(name);
    setActiveCard(null);
  };
  const DropDown = (name) => {
    setDropDownmenu(false);
    setChoosenInput(name);
  };

  // End of admin functions

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://blocbuddyapi.azurewebsites.net/api/getUser?`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData({
            user_id: data._id,
            role: data.Role,
            phoneNumber: data.Phone,
            propName: data.PropertyName,
            name: data.Name,
            unitID: data.UnitID,
            lastLogin: data.lastLogin,
          });
        } else {
          console.error(
            "Failed to fetch user:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsReady(true); // Set component readiness
      }
    };

    if (isAuthenticated && user.email) {
      fetchUser();
    }
  }, [isAuthenticated, user]);

  // Log activeLinkIdx to the console

  const [tickets, setTickets] = useState([]);
  const [fines, setFines] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const resetActiveCard = () => {
    setActiveCard(null);
  };

  useEffect(() => {
    if (userData.user_id) {
      fetchTickets();
      fetchNotifications();
      if (userData.role === "Resident") {
        fetchFines();
      }
    }
  }, [userData]);

  const fetchTickets = async () => {
    try {
      let requestBody = {};

      if (userData.role === "Resident") {
        requestBody = { user_id: userData.user_id };
      } else if (userData.role === "Staff") {
        requestBody = { staff_id: userData.user_id };
      }
      const response = await fetch(
        "https://blocbuddyapi.azurewebsites.net/api/getUserTickets?",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else if (response.status === 404) {
        setTickets([]);
      } else {
        console.error(
          "Failed to fetch tickets:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsReady(true);
    }
  };

  const fetchFines = async () => {
    try {
      let requestBody = { resident_id: userData.user_id };

      // Make a POST request to the Azure Functions API endpoint
      const response = await fetch(
        "https://blocbuddyapi.azurewebsites.net/api/fetchUserFines?",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFines(data);
      } else if (response.status === 404) {
        setFines([]);
      } else {
        console.error(
          "Failed to fetch fines:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching fines:", error);
    } finally {
      setIsReady(true);
    }
  };

  const fetchNotifications = async () => {
    try {
      const endpoint =
        userData.role === "Staff"
          ? "https://blocbuddyapi.azurewebsites.net/api/getStaffNotifications"
          : "https://blocbuddyapi.azurewebsites.net/api/getResidentNotifications";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userData.user_id }),
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else if (response.status === 404) {
        setNotifications([]);
      } else {
        console.error(
          "Failed to fetch notifications:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      // Set the ready state to true or handle the final state as needed
      setIsReady(true);
    }
  };

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setTickets(tickets.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setTicketModalOpen(true);
  };

  const handlePaymentModal = (idx) => {
    setRowToEdit(idx);
    setPaymentModalOpen(true);
  };

  const handleNotificationModal = (idx) => {
    setRowToEdit(idx);
    setNotificationModalOpen(true);
  };

  const addTickets = (newRowItem) => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}-${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${currentDate.getFullYear()}`;

    const newRow = {
      ...newRowItem,
      dateOpened: formattedDate,
    };

    rowToEdit === null
      ? setTickets([newRow, ...tickets])
      : setTickets(
          tickets.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  let payFine = async (fine_id) => {
    try {
      const response = await fetch(
        "https://blocbuddyapi.azurewebsites.net/api/payFine",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fine_id: fine_id,
            resident_id: userData.user_id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fine status updated successfully:", data);
        fetchFines();
        // You can add any additional logic here, such as updating the UI
      } else {
        console.error(
          "Failed to update fine status:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating fine status:", error);
    }
  };

  useEffect(() => {
    let unseenCount = 0;
    const lastLog = new Date(userData.lastLogin);
    notifications.forEach((notification) => {
      const notiDate = new Date(notification.rawSendDate);
      if (notiDate > lastLog) {
        unseenCount++;
      }
    });
    setNotificationsCount(unseenCount);
  }, [notifications]);

  const handleViewN = (newRow) => {
    newRow.status = "seen";
    console.log(newRow);
    rowToEdit === null
      ? setNotifications([...notifications, newRow])
      : setNotifications(
          notifications.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  let ContentComponent;

  if (isReady && userData != null) {
    if (userData.role === "Resident") {
      switch (dashboardActiveLinkIdx) {
        case 0:
          ContentComponent = () => (
            <Content
              budgetItems={tickets}
              notifications={notifications}
              fines={fines}
            />
          );
          break;
        case 1:
          ContentComponent = () => (
            <Table1
              rows={tickets}
              deleteRow={handleDeleteRow}
              editRow={handleEditRow}
            />
          );
          break;
        case 2:
          ContentComponent = () => (
            <Fines rows={fines} editRow={handlePaymentModal} />
          );
          break;
        case 3:
          ContentComponent = () => (
            <Notifications
              rows={notifications}
              editRow={handleNotificationModal}
            />
          );
          break;
        case 4:
          ContentComponent = () => (
            <div className="report-container">
              <TicketReport tickets={tickets} />
              <FineReport fines={fines} />
              <TicketReport tickets={tickets} />
            </div>
          );
          break;
        case 5:
          ContentComponent = () => <Profile userData={userData} />;
          break;
        default:
          ContentComponent = () => (
            <Content
              budgetItems={tickets}
              notifications={notifications}
              fines={fines}
            />
          );
      }
    } else if (userData.role === "Staff") {
      switch (dashboardActiveLinkIdx) {
        case 0:
          ContentComponent = () => (
            <Content
              budgetItems={tickets}
              notifications={notifications}
              fines={fines}
            />
          );
          break;
        case 1:
          ContentComponent = () => (
            <Table
              rows={tickets}
              deleteRow={handleDeleteRow}
              editRow={handleEditRow}
            />
          );
          break;
        case 2:
          ContentComponent = () => (
            <Notifications
              rows={notifications}
              editRow={handleNotificationModal}
            />
          );
          break;
        case 3:
          ContentComponent = () => (
            <div className="report-container">
              <TicketReport tickets={tickets} />
              <TicketReport tickets={tickets} />
            </div>
          );
          break;
        case 4:
          ContentComponent = () => <Profile userData={userData} />;
          break;
        default:
          ContentComponent = () => (
            <Content
              budgetItems={tickets}
              notifications={notifications}
              fines={fines}
            />
          );
      }
    }
  }

  if (!isReady) {
    return <Loading />;
  }

  return (
    <>
      {userData.role !== "Admin" && (
        <>
          <div className="app" ref={navRef}>
            <Sidebar
              setDashboardActiveLinkIdx={setDashboardActiveLinkIdx}
              dashboardActiveLinkIdx={dashboardActiveLinkIdx}
              userData={userData}
              notificationsCount={notificationsCount}
            />

            <div className="App">
              <ContentComponent />

              {dashboardActiveLinkIdx === 1 && userData.role === "Resident" && (
                <button
                  className="btn"
                  onClick={() => setTicketModalOpen(true)}
                >
                  Add
                </button>
              )}

              {dashboardActiveLinkIdx === 1 &&
                userData.role === "Staff" &&
                ticketModalOpen && (
                  <Modal
                    closeModal={() => {
                      setTicketModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={fetchTickets}
                    defaultValue={rowToEdit !== null && tickets[rowToEdit]}
                    userData={userData}
                  />
                )}

              {dashboardActiveLinkIdx === 1 &&
                userData.role === "Resident" &&
                ticketModalOpen && (
                  <Modal1
                    closeModal={() => {
                      setTicketModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={fetchTickets}
                    defaultValue={rowToEdit !== null && tickets[rowToEdit]}
                    userData={userData}
                  />
                )}

              {dashboardActiveLinkIdx === 2 &&
                userData.role === "Resident" &&
                paymentModalOpen && (
                  <PaymentModal
                    closeModal={() => {
                      setPaymentModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={payFine}
                    defaultValue={rowToEdit !== null && fines[rowToEdit]}
                  />
                )}

              {((dashboardActiveLinkIdx === 2 && userData.role === "Staff") ||
                (dashboardActiveLinkIdx === 3 &&
                  userData.role === "Resident")) &&
                notificationModalOpen && (
                  <NotificationsModal
                    closeModal={() => {
                      setNotificationModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={handleViewN}
                    defaultValue={
                      rowToEdit !== null && notifications[rowToEdit]
                    }
                  />
                )}
            </div>
          </div>
        </>
      )}

      {userData.role === "Admin" && (
        <>
          <div className={main ? "admin-close" : "admin"}>
            <Sidebar
              setDashboardActiveLinkIdx={setDashboardActiveLinkIdx}
              dashboardActiveLinkIdx={dashboardActiveLinkIdx}
              userData={userData}
              notificationsCount={notificationsCount}
              resetActiveCard={resetActiveCard}
            />

            <main className="main">
              {/* Admin functions */}

              {dashboardActiveLinkIdx === 0 && (
                <>
                  <CardsHome handleCardClick={handleCardClick}></CardsHome>

                  <article id="viewBox" className="viewBox">
                    <section id="header" className="header">
                      {activeCard === "Residents" && <ResidentsHeader />}
                      {activeCard === "Staff" && <StaffHeader />}
                      {activeCard === "Unsolved" && <UnsolvedHeader />}
                      {activeCard === "InProgress" && <InProgressHeader />}
                      {activeCard === "Solved" && <SolvedHeader />}
                      {activeCard === "Assigned" && <StaffAssingHeader />}
                      {activeCard === "Fines" && <ResidentsHeader />}
                      {activeCard === "History" && <HistoryHeader />}
                    </section>
                    <section id="viewComp" className="viewComp">
                      {activeCard === "Residents" && (
                        <Residents filterLetters={searchText} />
                      )}
                      {activeCard === "Staff" && (
                        <Staff filterLetters={searchText} />
                      )}
                      {activeCard === "Unsolved" && (
                        <Unsolved handleTicket={handleTicket} />
                      )}
                      {activeCard === "InProgress" && (
                        <InProgress handleTicket={handleTicket} />
                      )}
                      {activeCard === "Solved" && (
                        <Solved handleTicket={handleTicket} />
                      )}
                      {activeCard === "Assigned" && (
                        <StaffAssign TaskAssignedTo={TaskAssignedTo} />
                      )}
                      {activeCard == "History" && (
                        <AllNotification
                          handleNotificationClick={handleNotificationClick}
                        />
                      )}
                      {activeCard === "Fines" && (
                        <FinesMembers
                          filterLetters={searchText}
                          handleTicketClick={handleTicketClick}
                        />
                      )}
                    </section>
                  </article>
                </>
              )}

              {dashboardActiveLinkIdx === 1 && (
                <>
                  <CardsTask
                    handleTicketClick={handleTicketClick}
                    handleCardClick={handleCardClick}
                  ></CardsTask>

                  <article id="viewBox" className="viewBox">
                    <section id="header" className="header">
                      {activeCard === "Residents" && <ResidentsHeader />}
                      {activeCard === "Staff" && <StaffHeader />}
                      {activeCard === "Unsolved" && <UnsolvedHeader />}
                      {activeCard === "InProgress" && <InProgressHeader />}
                      {activeCard === "Solved" && <SolvedHeader />}
                      {activeCard === "Assigned" && <StaffAssingHeader />}
                      {activeCard === "Fines" && <ResidentsHeader />}
                      {activeCard === "History" && <HistoryHeader />}
                    </section>
                    <section id="viewComp" className="viewComp">
                      {activeCard === "Residents" && <Residents />}
                      {activeCard === "Staff" && <Staff />}
                      {activeCard === "Unsolved" && (
                        <Unsolved handleTicket={handleTicket} />
                      )}
                      {activeCard === "InProgress" && (
                        <InProgress handleTicket={handleTicket} />
                      )}
                      {activeCard === "Solved" && (
                        <Solved handleTicket={handleTicket} />
                      )}
                      {activeCard === "Assigned" && (
                        <StaffAssign TaskAssignedTo={TaskAssignedTo} />
                      )}
                      {activeCard == "History" && (
                        <AllNotification
                          handleNotificationClick={handleNotificationClick}
                        />
                      )}
                      {activeCard === "Fines" && (
                        <FinesMembers
                          filterLetters={searchText}
                          handleTicketClick={handleTicketClick}
                        />
                      )}
                    </section>
                  </article>
                </>
              )}
            </main>
          </div>
          <TicketsPop
            isOpen={ticketsPopOpen}
            handleCardClick={handleCardClick}
          />
          <TheTicket
            isClicked={TicketOpen}
            name={NamePerson}
            handleCardClick={ifAssignedClicked}
          />
          <TaskAssigned
            time={formattedTime}
            close={Close}
            RequestedBy={NamePerson1}
            TaskName={title}
            AssignedTo={StaffName}
            isAssigned={isAssigned}
          />
          <SideBar
            isOpen={SideOpen}
            CloseSideBar={Close}
            ViewActivits={ViewActivits}
          />
          <FinePop
            isFineTicketOpen={FineTicketOpen}
            personName={FineMember}
            handleCardClick={handleCardClick}
          />
          <UnsettledFine
            personName={FineMember}
            isOpen={UnsettledPop}
            Close={Close}
            Open={Open}
          />
          <SettledFine
            personName={FineMember}
            isOpen={SettledPop}
            Close={Close}
          />
          <CreateFine
            isOpen={createFinePop}
            Close={Close}
            resident={FineMember}
          />
          <SignUpForm isOpen={isSignUpOpen} closeSignUp={closeSignUp} />
          <Search setSearchText={setSearchText} isOpen={SeachOpen} />
          <NotificationPop
            isOpen={notificationPop}
            handleCardClick={handleCardClick}
            ref={notificationPopRef}
          />
          <NotificationStructure
            isOpen={notificationCreate}
            choosen={choosenInput}
            handleCardClick={handleCardClick}
            close={Close}
          />
          <SendTo dropDownClick={DropDown} isOpen={dropDownmenu} />
          <VNotification
            isOpen={myNotification}
            IdPerson={notificationId}
            close={Close}
          />
        </>
      )}
    </>
  );
}

export default Dashboard;
