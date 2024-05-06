import React from "react";

import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsCreditCard,
} from "react-icons/bs";

import "./Fines.css";

const Fines = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Fine Ref</th>
            <th className="expand">Description</th>
            <th>Status</th>
            <th>Date Issued</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.ref}</td>
                <td className="expand">{row.description}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
                <td className="pay">
                  <BsCreditCard
                    className="edit-btn"
                    onClick={() => editRow(idx)}
                  />
                  {"Pay now"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Fines;
