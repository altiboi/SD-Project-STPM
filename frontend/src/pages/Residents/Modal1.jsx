import React, { useState } from "react";
import "./Modal1.css";

const Modal1 = ({ closeModal, onSubmit, defaultValue, userData }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      ticket_subject: "",
      ticket_description: "",
      status: "open",
      user_id: userData.user_id,
      feedback: "", // Include feedback in the initial state
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.ticket_subject &&
      formState.ticket_description &&
      formState.status
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
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
            <label htmlFor="ticket_subject">Ticket Subject</label>
            <input
              name="ticket_subject"
              onChange={handleChange}
              value={formState.ticket_subject}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticket_description">Description</label>
            <textarea
              name="ticket_description"
              onChange={handleChange}
              value={formState.ticket_description}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
              disabled
            >
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              name="feedback"
              onChange={handleChange}
              value={formState.feedback}
              disabled
            />
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="button" className="btn" onClick={handleSubmit}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal1;
