import React, { useEffect, useRef } from "react";
import "./FinePop.css";
import OwedAmout, {
  Settled_Fines_number,
  Unsettled_Fines_number,
} from "./PesornalFineInfor";

function FinePop({ isFineTicketOpen, handleCardClick, personName, onClose }) {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClose("Fines");
    }
  };

  useEffect(() => {
    if (isFineTicketOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFineTicketOpen]);

  return (
    <>
      {isFineTicketOpen && <div className="overlay" />}
      <section
        ref={wrapperRef}
        id="TicketsPop"
        className={isFineTicketOpen ? "Ticketss_open" : "Ticketss"}
      >
        <section className="sectio1">
          <article
            onClick={() => handleCardClick("Unsettled")}
            style={{ "--clr": "#ff1867" }}
            className="popTickets red"
          >
            <section>
              <h5>
                Unsettled Fines <i className="fa-solid fa-envelope"></i>
              </h5>
            </section>
            <Unsettled_Fines_number personName={personName} />
          </article>
          <article
            onClick={() => handleCardClick("Settled")}
            style={{ "--clr": "#1e9bff" }}
            className="popTickets"
          >
            <section>
              <h5>
                Settled Fines{" "}
                <i className="fa-sharp fa-solid fa-circle-check"></i>
              </h5>
            </section>
            <Settled_Fines_number personName={personName} />
          </article>
        </section>
        <article
          onClick={() => handleCardClick("Solved")}
          style={{ "--clr": "#1e9bff" }}
          className="popTickets1"
        >
          <section>
            <h5 className="amount">
              total amount owed:
              <i className="fa-sharp fa-solid fa-circle-check"></i>
            </h5>
          </section>
          <section>
            <OwedAmout personName={personName} />
          </section>
        </article>
      </section>
    </>
  );
}

export default FinePop;
