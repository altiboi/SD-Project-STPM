import React, { useState } from "react";
import "./Modal1.css";

const Modal = ({ closeModal, onSubmit, defaultValue, userData }) => {
  const [formState, setFormState] = useState(
     {
      ticket_subject: "", // Change here
      ticket_description: "",
      status: "open",
      user_id: userData.user_id
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.ticket_subject && formState.ticket_description && formState.status) {
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
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await formState;

    try {
      const response = await fetch("https://blocbuddyapi.azurewebsites.net/api/createTicket?", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        // Call the onSubmit function passed as a prop
        onSubmit(formState);
        closeModal();
      } else {
        throw new Error(`Failed to add ticket: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding ticket:", error.message);
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
            <label htmlFor="ticket_subject">Ticket Subject</label>{" "}
            {/* Change here */}
            <input
              name="ticket_subject" // Change here
              onChange={handleChange}
              value={formState.ticket_subject} // Change here
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticket_description">Description</label>
            <textarea
              name="ticket_description" // Change here
              onChange={handleChange}
              value={formState.ticket_description} // Change here
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
