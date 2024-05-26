import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./RTable.css";
import Residents from "../../../admin/Residents";

const Table = ({
  rows,
  deleteRow,
  editRow,
  filterLetters,
  activeCard,
  handleNotificationClick,
  handleTicket,
  handleTicketClick,
  selectedTicketId,
  TaskAssignedTo
}) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (activeCard === "Residents") {
          response = await fetch(
            "https://showresidents.azurewebsites.net/api/ShowResidents_?"
          );
        } else if (activeCard === "Staff") {
          response = await fetch(
            "https://showresidents.azurewebsites.net/api/ShowStaff_?"
          );
        } else if (activeCard === "History") {
          response = await fetch(
            "https://blocbuddyapi.azurewebsites.net/api/getHistorical_notifs"
          );
        } else if (activeCard === "Unsolved") {
          response = await fetch(
            "https://showresidents.azurewebsites.net/api/getUnsolved_Tickets?"
          );
        } else if (activeCard === "Solved") {
          response = await fetch(
            "https://blocbuddyapi.azurewebsites.net/api/getSolved_Tickets?"
          );
        } else if (activeCard === "InProgress") {
          response = await fetch(
            "https://blocbuddyapi.azurewebsites.net/api/get_tickets_InProgress?"
          );
        } else if (activeCard === "Fines") {
          response = await fetch(
            "https://blocbuddyapi.azurewebsites.net/api/fetchFines?"
          );
        } else if (activeCard === "Assigned") {
        response = await fetch(
          "https://showresidents.azurewebsites.net/api/ShowStaff_"
        );
      }

        if (response) {
          const data = await response.json();
          console.log("Fetched Data:", data);
          setResidents(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeCard]);

  const filterResidents = (
    residents,
    filterLetters,
    handleNotificationClick
  ) => {
    if (!filterLetters) {
      return residents;
    }
    return residents.filter((person) => {
      const residentName = person.Name?.toLowerCase() || "";
      return residentName.includes(filterLetters.toLowerCase());
    });
  };

  const filteredResidents = filterResidents(residents, filterLetters);
  console.log("active card", activeCard);
  const assignTask = async (staffId, ticketId) => {
    try {
        console.log("Selected Ticket ID:", ticketId); // Log to debug
        console.log("Staff ID:", staffId); // Log to debug

        const response = await fetch('https://blocbuddyapi.azurewebsites.net/api/Assign_task?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticket_id: ticketId, staff_id: staffId }),
        });

        if (!response.ok) {
            throw new Error('Failed to assign task');
        }

        const result = await response.json();
        console.log(result.message);
        TaskAssignedTo(staffId, ticketId);
    } catch (error) {
        console.error(error.message);
    }
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

  return (
    <>
      {activeCard === "Residents" ? (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>UnitID</th>
                <th className="expand">Building</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidents.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.Name}</td>
                  <td>{row.UnitID}</td>
                  <td>{row.PropertyName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : activeCard === "Staff" ? (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th className="expand">Building</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidents.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.Name}</td>
                  <td>{row.Job}</td>
                  <td>{row.PropertyName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : activeCard === "History" ? (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Date</th>
                <th className="expand">Notification</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((row, idx) => (
                <tr
                  onClick={() => {
                    handleNotificationClick("MyN", row._id);
                  }}
                  key={idx}
                >
                  <td>{row.recipient}</td>
                  <td>{row.sendDate}</td>
                  <td>{row.header}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : activeCard === "Unsolved" ? (
        <div className="table-wrapper">
  <table className="table">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Description</th>
        <th className="expand">Date</th>
      </tr>
    </thead>
    <tbody>
      {residents.map((row, idx) => {
        const truncatedDescription = truncateText(row.ticket_description, 20);
        return (
          <tr onClick={() => handleTicket(row._id)} key={idx}>
            <td>{row.ticket_subject}</td>
            <td>{truncatedDescription}</td> {/* Use the truncated description here */}
            <td>{row.dateOpened}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
      ) : activeCard === "Solved" ? (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>

                <th>Description</th>
                <th className="expand">Date</th>
              </tr>
            </thead>
            <tbody>
            {residents.map((row, idx) => {
        const truncatedDescription = truncateText(row.ticket_description, 20);
        return (
          <tr onClick={() => handleTicket(row._id)} key={idx}>
            <td>{row.ticket_subject}</td>
            <td>{truncatedDescription}</td> {/* Use the truncated description here */}
            <td>{row.dateOpened}</td>
          </tr>
        );
      })}
            </tbody>
          </table>
        </div>
      ) : activeCard === "InProgress" ? (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>

                <th>Description</th>
                <th className="expand">Date</th>
              </tr>
            </thead>
            <tbody>
            {residents.map((row, idx) => {
        const truncatedDescription = truncateText(row.ticket_description, 20);
        return (
          <tr onClick={() => handleTicket(row._id)} key={idx}>
            <td>{row.ticket_subject}</td>
            <td>{truncatedDescription}</td> 
            <td>{row.dateOpened}</td>
          </tr>
        );
      })}
            </tbody>
          </table>
        </div>
      ) : activeCard === "Fines" ? (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>

                <th>Room</th>
                <th className="expand">Building</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((row, idx) => (
                <tr
                  onClick={() => {
                    handleTicketClick("Fines", row.Resident);
                  }}
                  key={idx}
                >
                  <td>{row.Resident}</td>

                  <td>{}</td>
                  <td>{}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): activeCard === "Assigned" ? (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>

                <th>Role</th>
                <th className="expand">UnitID</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((row, idx) => (
                <tr
                 onClick={() => assignTask(row._id, selectedTicketId)}
                  key={idx}
                >
                  <td>{row.Name}</td>

                  <td>{row.Role}</td>
                  <td>{row.UnitID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default Table;
