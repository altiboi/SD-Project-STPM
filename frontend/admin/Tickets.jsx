import React, { useState, useEffect, useRef } from "react";
import "./Tickets.css";
import { UnsolvedValue, Number1 } from "./Unsolved";
import { InProgressValue, Number2 } from "./InProgress";
import { SolvedValue, Number3 } from "./Solved";

function TicketsPop({ isOpen, handleCardClick, onClose }) {
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
      {isOpen && <div className="overlay" onClick={onClose} />}

      <section
        id="TicketsPop"
        ref={wrapperRef}
        className={isOpen ? "Tickets_open" : "Tickets"}
      >
        <article
          onClick={() => handleCardClick("Unsolved")}
          style={{ "--clr": "#ff1867" }}
          className="popTicket red"
        >
          <section>
            <h5>
              Unsolved Tickets <i className="fa-solid fa-envelope"></i>
            </h5>
          </section>
          <UnsolvedValue />
        </article>
        <article
          onClick={() => handleCardClick("InProgress")}
          style={{ "--clr": "#6eff3e" }}
          className="popTicket green"
        >
          <section>
            <h5>
              In Progress<i className="fa-solid fa-envelope-open"></i>
            </h5>
          </section>
          <InProgressValue />
        </article>
        <article
          onClick={() => handleCardClick("Solved")}
          style={{ "--clr": "#1e9bff" }}
          className="popTicket"
        >
          <section>
            <h5>
              Solved Tickets{" "}
              <i className="fa-sharp fa-solid fa-circle-check"></i>
            </h5>
          </section>
          <SolvedValue />
        </article>
      </section>
    </>
  );
}

export default function Total() {
  return <p id="Num_tickets">{Number1() + Number2() + Number3()}</p>;
}

export { TicketsPop };
