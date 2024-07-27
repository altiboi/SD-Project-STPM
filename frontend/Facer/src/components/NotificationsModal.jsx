import React, { useState } from "react";
import "../Modal.css";
import car from '../assets/car.jpg';


const NotificationsModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      ticketnumber: "", // Change here
      description: "",
      status: "Closed",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.ticketnumber && formState.description && formState.status) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    /* if (!validateForm()) return; */

    onSubmit(formState);

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
            <label htmlFor="ticketnumber">Sender</label> {/* Change here */}
            <input
              name="ticketnumber" // Change here
              onChange={handleChange}
              value={formState.sender} // Change here
              disabled="disabled"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
              disabled="disabled"
            />
          </div>

          {
            formState.image && 
            <div className="form-group">
            <label htmlFor="images">images</label>
            <img className="modalImage" src={car} alt="" />
          </div>

          }
          

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            View
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationsModal;
