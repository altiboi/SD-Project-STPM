import React, { useState } from "react";
import "./paymentModal.css";

const PaymentModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      fine_amount: "",
      fine_reason: ""
    }
  );

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formState.fine_id);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="fine_amount">Amount</label>
            <input
              name="fine_amount"
              onChange={handleChange}
              value={formState.fine_amount} 
              disabled="disabled"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fine_description">Description</label>
            <textarea
              name="fine_description"
              onChange={handleChange}
              value={formState.fine_reason}
              disabled="disabled"
            />
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
