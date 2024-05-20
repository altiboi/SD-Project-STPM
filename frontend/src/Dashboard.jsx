import "./Dashboard.css";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Profile from "./pages/Login/Profile";
import Table from "./pages/Staff/Table";
import Modal from "./pages/Staff/Modal";
import Table1 from "./pages/Residents/Table1"
import Modal1 from "./pages/Residents/Modal1"
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

function Dashboard() {
  const navRef = useRef();
  const [dashboardActiveLinkIdx, setDashboardActiveLinkIdx] = useState(0);
  const { user, logout, isAuthenticated} = useAuth0();
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState({
    user_id: null,
    role: null,
    phoneNumber: null,
    propName: null,
    name: null,
    unitID: null,
    lastLogin: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await fetch(`https://blocbuddyapi.azurewebsites.net/api/getUser?`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email : user.email})
              });
          if (response.ok) {
            const data = await response.json();
            setUserData({
              user_id: data._id,
              role: data.Role,
              phoneNumber: data.Phone,
              propName: data.PropertyName,
              name: data.Name,
              unitID: data.UnitID,
              lastLogin: data.lastLogin
            });
          } else {
            console.error('Failed to fetch user:', response.status, response.statusText);
          }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsReady(true); // Set component readiness
      }
    };

    if (isAuthenticated && user.email) {
      fetchUser();
    }
  }, [isAuthenticated, user]);

  // Log activeLinkIdx to the console
  console.log(dashboardActiveLinkIdx);

  const [modalOpen, setModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [fines, setFines] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    if(userData.user_id){
      fetchTickets();
      fetchNotifications();
      if(userData.role === "Resident"){
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
      const response = await fetch("https://blocbuddyapi.azurewebsites.net/api/getUserTickets?", 
      {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else if (response.status === 404) {
      setTickets([]);
      } else {
        console.error("Failed to fetch tickets:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally{
      setIsReady(true);
    }
  };

  const fetchFines = async () => {
    try {
        let requestBody = {resident_id: userData.user_id};

        // Make a POST request to the Azure Functions API endpoint
        const response = await fetch("https://blocbuddyapi.azurewebsites.net/api/fetchUserFines?", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const data = await response.json();
            setFines(data);
        } else if (response.status === 404) {
            setFines([]);
        } else {
            console.error("Failed to fetch fines:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error fetching fines:", error);
    } finally {
        setIsReady(true);
    }
};

const fetchNotifications = async () => {
  try {
      const endpoint = userData.role === 'Staff' 
          ? "https://blocbuddyapi.azurewebsites.net/api/getStaffNotifications" 
          : "https://blocbuddyapi.azurewebsites.net/api/getResidentNotifications";
      
      const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: userData.user_id })
      });

      if (response.ok) {
          const data = await response.json();
          setNotifications(data);
      } else if (response.status === 404) {
          setNotifications([]);
      } else {
          console.error("Failed to fetch notifications:", response.status, response.statusText);
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
    setModalOpen(true);
  };

  const addTickets = (newRowItem) => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
    
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
      const response = await fetch("https://blocbuddyapi.azurewebsites.net/api/payFine", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fine_id: fine_id,
          resident_id: userData.user_id
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Fine status updated successfully:", data);
        fetchFines();
        // You can add any additional logic here, such as updating the UI
      } else {
        console.error("Failed to update fine status:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error updating fine status:", error);
    }
  };
  

  useEffect(() => {
    let unseenCount = 0;
    const lastLog = new Date(userData.lastLogin);
    notifications.forEach(notification => {
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

  if(isReady && userData != null){
    if(userData.role === "Resident"){
      switch (dashboardActiveLinkIdx) {
        case 0:
          ContentComponent = () => <Content budgetItems={tickets} notifications={notifications} fines={fines}/>;
          break;
        case 1:
          ContentComponent = () => <Table1 rows={tickets}/>;
          break;
        case 2:
          ContentComponent = () => <Fines rows={fines} editRow={handleEditRow}/>;
          break;
        case 3:
          ContentComponent = () => <Notifications rows={notifications} editRow={handleEditRow}/>;
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
          ContentComponent = () => <Profile userData={userData}/>;
          break;
        default:
          ContentComponent = () => <Content budgetItems={tickets} notifications={notifications} fines={fines}/>;
      }
    } else if(userData.role === "Staff"){
      switch (dashboardActiveLinkIdx) {
        case 0:
          ContentComponent = () => <Content budgetItems={tickets} notifications={notifications} fines={fines}/>;
          break;
        case 1:
          ContentComponent = () => <Table rows={tickets} />;
          break;
        case 2:
          ContentComponent = () => <Notifications rows={notifications} editRow={handleEditRow}/>;
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
          ContentComponent = () => <Profile userData={userData}/>;
          break;
        default:
          ContentComponent = () => <Content budgetItems={tickets} notifications={notifications} fines={fines}/>;
      }
    }
  }

  if (!isReady) {
    return <Loading />;
  }

  return (
    <div className="app" ref={navRef}>
      <Sidebar
        setDashboardActiveLinkIdx={setDashboardActiveLinkIdx}
        dashboardActiveLinkIdx={dashboardActiveLinkIdx}
        userData={userData}
        notificationsCount={notificationsCount}
      />

      {dashboardActiveLinkIdx === 1 || dashboardActiveLinkIdx === 2 ? (
        <div className="App">
          <ContentComponent
          deleteRow={handleDeleteRow} 
          editRow={handleEditRow}/>

          {dashboardActiveLinkIdx === 1 && userData.role === "Resident" &&
          (
            <button className="btn" onClick={() => setModalOpen(true)}>
              Add
            </button>
          )}

          {dashboardActiveLinkIdx === 1 && userData.role === "Staff" && modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={fetchTickets}
              defaultValue={rowToEdit !== null && tickets[rowToEdit]}
              userData={userData}
            />
          )}

          {dashboardActiveLinkIdx === 1 && userData.role === "Resident" && modalOpen && (
            <Modal1
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={fetchTickets}
              defaultValue={rowToEdit !== null && tickets[rowToEdit]}
              userData={userData}
            />
          )}

          {dashboardActiveLinkIdx === 2 && modalOpen && (
            <PaymentModal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={payFine}
              defaultValue={rowToEdit !== null && fines[rowToEdit]}
            />
          )}

          {((dashboardActiveLinkIdx === 2 && userData.role === "Staff") || 
          (dashboardActiveLinkIdx === 3 && userData.role === "Resident")) 
          && modalOpen && (
            <NotificationsModal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleViewN}
              defaultValue={rowToEdit !== null && notifications[rowToEdit]}
            />
          )}
        </div>
      ) : (
        <ContentComponent />
      )}
    </div>
  );
}

export default Dashboard;