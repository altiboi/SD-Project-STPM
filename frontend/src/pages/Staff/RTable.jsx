import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./RTable.css";
import Residents from "../../../admin/Residents";

const Table = ({ rows, deleteRow, editRow, filterLetters, activeCard }) => {
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

  const filterResidents = (residents, filterLetters) => {
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
                <tr key={idx}>
                  <td>{row.recipient}</td>
                  <td>{row.sendDate}</td>
                  <td>{row.header}</td>
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
