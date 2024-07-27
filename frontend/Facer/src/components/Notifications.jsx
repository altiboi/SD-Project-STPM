import React from "react";

import { GrFormView } from "react-icons/gr";

import '../Fines.css'
const Notifications = ({ rows, deleteRow, editRow }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Sender</th>
            <th className="expand">Message</th>
            <th>Status</th>
            <th>Date Issued</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);
              const truncatedDescription = truncateText(row.description, 30);


            return (
              <tr key={idx}>
                <td>{row.sender}</td>
                <td className="expand">{truncatedDescription}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td>{row.date}</td>
                <td className="pay">
                  <GrFormView
                    className="edit-btn"
                    onClick={() => editRow(idx)}
                  />
                  {" View now"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
