import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";

import "./Table1.css";

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.ticket_subject}</td>
                <td className="expand">{row.ticket_description}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td>{row.feedback}</td>
                <td className="pay">
                  <GrFormView
                    className="edit-btn"
                    onClick={() => editRow(idx)}
                  />
                  {"View now"}
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
