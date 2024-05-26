import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import "./Table1.css";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Ticket Subject</th>
            <th className="expand">Description</th>
            <th>Status</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
            const truncatedDescription = truncateText(row.ticket_description, 25);

            return (
              <tr key={idx}>
                <td>{row.ticket_subject}</td>
                <td className="expand">{truncatedDescription}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="pay">
                  {row.staff_feedback !== "" ? (
                    <>
                      <GrFormView
                        className="edit-btn"
                        onClick={() => editRow(idx)}
                      />
                      {"View now"}
                    </>
                  ) : (
                    "No feedback"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;