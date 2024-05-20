import React, { useState } from "react";
import "../pages/Staff/Modal.css";

const NotificationsModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      senderName: "", 
      header: "",
      body: "",
      photo: "", 
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.senderName && formState.header && formState.body && formState.photo) {
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

    if (!validateForm()) return;

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
            <label htmlFor="senderName">Sender</label>
            <textarea
              name="senderName"
              onChange={handleChange}
              value={formState.senderName}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="header">Title</label>
            <textarea
              name="header"
              value={formState.header}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Description</label>
            <textarea
              name="body"
              onChange={handleChange}
              value={formState.body}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <div className="photo-container">
              <img src={formState.photo} alt="Notification" className="notification-photo" />
            </div>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
        </form>
      </div>
    </div>
  );
};

export default NotificationsModal;