import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ closeModal, onSubmit, defaultValue, userData }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      _id: "",
      ticket_subject: "",
      ticket_description: "",
      status: "open",
      user_id: userData.user_id,
      staff_feedback: ""
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState._id &&
      formState.ticket_subject &&
      formState.ticket_description &&
      formState.status &&
      formState.staff_feedback
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

    if (formState.status === "closed" && formState.staff_feedback !== "") {
      try {
        const response = await fetch(
          "https://blocbuddyapi.azurewebsites.net/api/closeTicket?",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
          }
        );

        if (response.ok) {
          // Call the onSubmit function passed as a prop
          onSubmit(formState);
          closeModal();
        } else {
          throw new Error(
            `Failed to add ticket: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error adding ticket:", error.message);
      }
    } else {
      setErrors("Feedback must be provided when closing the ticket.");
    }
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
            <label htmlFor="ticket_subject">Subject</label>
            <input
              name="ticket_subject"
              onChange={handleChange}
              value={formState.ticket_subject}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticket_description">Description</label>
            <textarea
              name="ticket_description"
              onChange={handleChange}
              value={formState.ticket_description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="closed">Closed</option>
              <option value="unresolved">Unresolved</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              name="feedback"
              onChange={handleChange}
              value={formState.staff_feedback}
            />
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;