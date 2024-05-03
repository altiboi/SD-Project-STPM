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
    name: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await fetch(`https://blocbuddyapi.azurewebsites.net/api/getUser?code=Ck8uIBDdT33M-VtQe1FFX_mwzwREjm3N4MjS7ySEfUO0AzFuYmSb_g==`, {
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
              name: data.Name
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

  useEffect(() => {
    if(userData.user_id ){
      fetchTickets();
    }
  }, [userData]); // Only run once when the component mounts

  const fetchTickets = async () => {
    try {
      let requestBody = {};

      if (userData.role === "Resident") {
        requestBody = { user_id: userData.user_id };
      } else if (userData.role === "Staff") {
        requestBody = { staff_id: userData.user_id };
      }
      const response = await fetch("https://blocbuddyapi.azurewebsites.net/api/getUserTickets?code=Eh_4ACpN6JGezImVFLd8w6S18PSIzO2nC63TKLy672RRAzFuMdm0kQ==", 
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

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setTickets(tickets.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRowItem) => {
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

  let ContentComponent;

  if(isReady && tickets != null && userData != null){
    switch (dashboardActiveLinkIdx) {
      case 0:
        ContentComponent = () => <Content budgetItems={tickets} />;
        break;
      case 1:
        ContentComponent = userData.role == "Resident" ? Table : Table1;
        break;
      case 3:
        ContentComponent = () => <Profile userData={userData}/>;
        break;
      // Add cases for other activeLinkIdx values as needed
      default:
        ContentComponent = () => <Content budgetItems={tickets} />;
    }
  }

  if (!isReady || tickets == null) {
    return <Loading />;
  }

  return (
    <div className="app" ref={navRef}>
      <Sidebar
        setDashboardActiveLinkIdx={setDashboardActiveLinkIdx}
        dashboardActiveLinkIdx={dashboardActiveLinkIdx}
      />

      {dashboardActiveLinkIdx === 1 ? (
        <div className="App">
          <ContentComponent
            rows={tickets}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />

          <button className="btn" onClick={() => setModalOpen(true)}>
            Add
          </button>

          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && tickets[rowToEdit]}
              userData={userData}
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
