import React from "react";
import { ResidentsValue } from "./Residents";
import { StaffValue } from "./Staff";
import { NumberOfFined } from "./FinesMembers";
import "./Cards.css";

function CardsHome({ handleCardClick, handleTicketClick }) {
  return (
    <article className="Cards">
      <section onClick={() => handleCardClick("Residents")} className="Card">
        <article className="art">
          <h4>View Residents</h4>
          <i className="fa-solid fa-user-group"></i>
        </article>
        <ResidentsValue />
      </section>
      <section
        onClick={() => handleCardClick("Notifications")}
        className="Card"
      >
        <article className="art">
          <h4>Notifications</h4>
          <i className="fa-solid fa-user-helmet-safety"></i>
        </article>
        <StaffValue />
      </section>

      <section onClick={() => handleCardClick("Staff")} className="Card">
        <article className="art">
          <h4>View STAFF</h4>
          <i className="fa-solid fa-user-helmet-safety"></i>
        </article>
        <StaffValue />
      </section>
    </article>
  );
}
function CardsTask({ handleCardClick, handleTicketClick, openSignUp }) {
  return (
    <article className="Cards">
      <section
        onClick={() => {
          handleTicketClick("tickets");
        }}
        className="Card"
      >
        <article className="art">
          <h4>TICKETS</h4>
          <i className="fa-solid fa-ticket"></i>
        </article>
        <total />
      </section>
      <section onClick={() => handleCardClick("Fines")} className="Card">
        <article className="art">
          <h4>Fines</h4>
          <i className="fa-solid fa-user-group"></i>
        </article>
        <NumberOfFined />
      </section>
      <section onClick={openSignUp} className="Card">
        <article className="art">
          <h4>Add Person</h4>
          <i className="fa-solid fa-ticket"></i>
        </article>
        <total />
      </section>
    </article>
  );
}

export default CardsHome;
export { CardsTask };
