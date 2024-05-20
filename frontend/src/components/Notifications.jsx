import React from "react";

import { GrFormView } from "react-icons/gr";

import '../pages/Residents/Fines.css'
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
            <th>Title</th>
            <th className="expand">Message</th>
            <th>Date Issued</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
              const truncatedDescription = truncateText(row.body, 25);
            return (
              <tr key={idx}>
                <td>{row.senderName}</td>
                <td>{row.header}</td>
                <td className="expand">{truncatedDescription}</td>
                <td>{row.sendDate}</td>
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

export default Notifications;