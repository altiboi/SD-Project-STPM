import "./ResidentDashboard.css";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Table from "../Table";
import Modal from "../Modal";

import { useRef, useState, useEffect } from "react";

function Dashboard() {
  const navRef = useRef();
  const [dashboardActiveLinkIdx, setDashboardActiveLinkIdx] = useState(0); // Initialize active link index

  // Log activeLinkIdx to the console
  console.log(dashboardActiveLinkIdx);

  let ContentComponent;

  switch (dashboardActiveLinkIdx) {
    case 0:
      ContentComponent = Content;
      break;
    case 1:
      ContentComponent = Table;
      break;
    // Add cases for other activeLinkIdx values as needed
    default:
      ContentComponent = Content;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "100",
      description: "Leaking toilet",
      status: "Open",
    },
    {
      page: "101",
      description: "Water leak",
      status: "Closed",
    },
    {
      page: "102",
      description: "Pipe burst",
      status: "Open",
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
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
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
      />

      {dashboardActiveLinkIdx === 1 ? (
        <>
          <ContentComponent
            rows={rows}
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
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}
        </>
      ) : (
        <ContentComponent />
      )}
    </div>
  );
}

export default Dashboard;
