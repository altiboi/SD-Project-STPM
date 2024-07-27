import "./ResidentDashboard.css";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Table from "../Table";
import Fines from "../Fines";
import Notifications from "../components/Notifications";
import PaymentModal from "../PaymentModal";
import NotificationsModal from "../components/NotificationsModal";

import Modal from "../Modal";
import Profile from "./Profile";

import { useRef, useState, useEffect } from "react";

function Dashboard() {
  const navRef = useRef();
  const [dashboardActiveLinkIdx, setDashboardActiveLinkIdx] = useState(0); // Initialize active link index
  const [notificationsCount, setNotificationsCount] = useState(0); // Example notification count



  const [notifications, setNotifications] = useState([
    {
      sender: "Admin",
      description: "You have been fined R495.98 for parking in someone else's parking spot",
      status: "unseen",
      date: "1 January 2023",
      amount: "R499",
      ticketnumber: 1,
      image: "image goes here"
    },
    {
      ref: "101",
      description: "A noise complaint has been filed against you, and you have been charged R500",
      status: "unseen",
      date: "3 March 2024",
      amount: "R739",
      ticketnumber: 2,
      sender: "Admin",
      
    },
    {
      ref: "102",
      description: "There is going to be a hailstorm at 13:00 today, please be aware that it is not advised that you drive in such weather conditions",
      status: "seen",
      date: "7 October 2019",
      amount: "R495",
      ticketnumber: 3,
      sender: "Admin",

    },
  ]);

  useEffect(() => {
    // Count unseen notifications
    let unseenCount = 0;
    notifications.forEach(notification => {
      if (notification.status === "unseen") {
        unseenCount++;
      }
    });
    // Set the notifications count
    setNotificationsCount(unseenCount);
  }, [notifications]);

  // Log activeLinkIdx to the console
  //console.log(dashboardActiveLinkIdx);

  let ContentComponent;

  switch (dashboardActiveLinkIdx) {
    case 0:
      ContentComponent = Content;
      break;
    case 1:
      ContentComponent = Table;
      break;

    case 2:
      ContentComponent = Fines;
      break;

    case 3:
      ContentComponent = Profile;
      break;

    case 4:
      ContentComponent = Notifications;
      break;
    // Add cases for other activeLinkIdx values as needed
    default:
      ContentComponent = Content;
      break;
  }


  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      ref: "100",
      description: "Parking ticket",
      status: "unseen",
      date: "1 January 2023",
      amount: "R499",
      ticketnumber: 1,
      sender: "Admin",
    },
    {
      ref: "101",
      description: "Broken door",
      status: "closed",
      date: "3 March 2024",
      amount: "R739",
      ticketnumber: 2,
      sender: "Admin",
      
    },
    {
      ref: "102",
      description: "Pipe burst",
      status: "unseen",
      date: "7 October 2019",
      amount: "R495",
      ticketnumber: 3,
      sender: "Admin",

    },
  ]);








  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    //newRow.status = "closed";
    console.log(newRow);
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };



  const handleView = (newRow) => {
    newRow.status = "seen";
    console.log(newRow);
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

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



  return (
    <div className="app" ref={navRef}>
      <Sidebar
        setDashboardActiveLinkIdx={setDashboardActiveLinkIdx}
        dashboardActiveLinkIdx={dashboardActiveLinkIdx}
        notificationsCount={notificationsCount}
      />

      {dashboardActiveLinkIdx === 1 || dashboardActiveLinkIdx === 2 || dashboardActiveLinkIdx === 4 ? (
        <div className="App">
          <ContentComponent
            rows={dashboardActiveLinkIdx === 1 || dashboardActiveLinkIdx == 2 ? rows : notifications}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />

          {dashboardActiveLinkIdx === 2 || dashboardActiveLinkIdx === 4 ? (
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
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}

          {dashboardActiveLinkIdx === 2 && modalOpen && (
            <PaymentModal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}

          
          {dashboardActiveLinkIdx === 4 && modalOpen && (
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
