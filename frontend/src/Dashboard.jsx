import "./Dashboard.css";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Profile from "./pages/Login/Profile";
import Table from "./pages/Residents/Table";
import Modal from "./pages/Residents/Modal";
import Table1 from "./pages/Staff/Table1"
import Modal1 from "./pages/Staff/Modal1"
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState, useEffect } from "react";
import Loading from "./components/Loading";
import { bufferToImage } from "face-api.js";
import TicketReport from "./components/TicketReport";
import FineReport from "./components/FineReport";
import Fines from "./pages/Residents/Fines";
import PaymentModal from "./pages/Residents/PaymentModal";

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
    unitID: null
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
              unitID: data.UnitID
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
  const [tickets, setTickets] = useState(null);
  const [fines, setFines] = useState(null);

  useEffect(() => {
    if(userData.user_id){
      fetchTickets();
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

  const addFines = (newRowItem) => {
    // const currentDate = new Date();
    // const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
    
    // const newRow = {
    //   ...newRowItem,
    //   dateOpened: formattedDate,
    // };
    
    rowToEdit === null
      ? setFines([newRow, ...fines])
      : setFines(
          fines.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  let ContentComponent;

  if(isReady && tickets != null && userData != null){
    switch (dashboardActiveLinkIdx) {
      case 0:
        ContentComponent = () => <Content budgetItems={tickets} />;
        break;
      case 1:
        ContentComponent = userData.role == "Resident" ? Table : Table1;
        break;
      case 2:
        ContentComponent = () => <Fines rows={fines}/>;
        break;
      case 3:
        ContentComponent = () => (
          <div className="report-container">
            <TicketReport tickets={tickets} />
            <FineReport fines={fines} />
            <TicketReport tickets={tickets} />
          </div>
        );
        break;
      case 4:
        ContentComponent = () => <Profile userData={userData}/>;
        break;
      default:
        ContentComponent = () => <Content budgetItems={tickets} />;
    }
  }

  if (!isReady || tickets == null || fines == null) {
    return <Loading />;
  }

  return (
    <div className="app" ref={navRef}>
      <Sidebar
        setDashboardActiveLinkIdx={setDashboardActiveLinkIdx}
        dashboardActiveLinkIdx={dashboardActiveLinkIdx}
        userData = {userData}
      />

{dashboardActiveLinkIdx === 1 || dashboardActiveLinkIdx === 4 ? (
        <div className="App">
          <ContentComponent
            rows={dashboardActiveLinkIdx === 1 ? tickets : fines}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />

          {dashboardActiveLinkIdx === 2 ? (
            console.log("skipped")
          ) : (
            <button className="btn" onClick={() => setModalOpen(true)}>
              Add
            </button>
          )}

          {dashboardActiveLinkIdx === 1 && modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={addTickets}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
              userData={userData}
            />
          )}

          {dashboardActiveLinkIdx === 4 && modalOpen && (
            <PaymentModal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={addFines}
              defaultValue={rowToEdit !== null && fines[rowToEdit]}
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
