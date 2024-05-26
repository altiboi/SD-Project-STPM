import React, { useEffect, useRef } from "react";
import "./NotificationPop.css";

function NotificationPop({ isOpen, handleCardClick, personName, onClose }) {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="overlay" />}
      <section
        ref={wrapperRef}
        id="TicketsPop"
        className={isOpen ? "Tickets_open" : "Tickets"}
      >
        <article
          onClick={() => handleCardClick("cNotification")}
          style={{ "--clr": "#ff1867" }}
          className="popTicket red"
        >
          <section>
            <h5>
              Create Notification <i className="fa-solid fa-envelope"></i>
            </h5>
          </section>
        </article>
        <article
          onClick={() => handleCardClick("History")}
          style={{ "--clr": "#1e9bff" }}
          className="popTicket"
        >
          <section>
            <h5>
              History <i className="fa-sharp fa-solid fa-circle-check"></i>
            </h5>
          </section>
        </article>
      </section>
    </>
  );
}

export default NotificationPop;
