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
                <td className="expand">{row.fine_reason}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.date_issued}</td>
                <td>{row.fine_amount}</td>
                {row.status === "Unpaid" ? <td className="pay">
                  <BsCreditCard
                    className="edit-btn"
                    onClick={() => editRow(idx)}
                  />
                  {"Pay now"}
                </td> : <td>{"Paid"}</td> }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Fines;
