import React from "react";
import { ResidentsValue } from "./Residents";
import { StaffValue } from "./Staff";
import { NumberOfFined } from "./FinesMembers";
import "./Cards.css";
import house from "../admin/images/house.png";
import notificationIcon from "../admin/images/notification.png";
import staffIcon from "../admin/images/team.png";
import ticketIcon from "../admin/images/ticket.png";
import fineIcon from "../admin/images/fine.png";
import addUserIcon from "../admin/images/addUser.png";

function CardsHome({ handleCardClick, handleTicketClick }) {
  return (
    <article className="Cards">
      <section onClick={() => handleCardClick("Residents")} className="Card">
        <article className="art">
          <h4>View Residents</h4>
          <i className="fa-solid fa-user-group"></i>
        </article>
        <div className="resident-info">
          {/*<ResidentsValue /> */}
          <img src={house} alt="House icon" className="icon" />
        </div>
      </section>
      <section
        onClick={() => handleCardClick("Notifications")}
        className="Card"
      >
        <article className="art">
          <h4>Notifications</h4>
          <i className="fa-solid fa-user-helmet-safety"></i>
        </article>
        <div className="resident-info">
          {/*<StaffValue /> */}
          <img src={notificationIcon} alt="House icon" className="icon" />
        </div>
      </section>

      <section onClick={() => handleCardClick("Staff")} className="Card">
        <article className="art">
          <h4>View Staff</h4>
          <i className="fa-solid fa-user-helmet-safety"></i>
        </article>
        <div className="resident-info">
          {/*<StaffValue /> */}
          <img src={staffIcon} alt="House icon" className="icon" />
        </div>
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

        <div className="resident-info">
          {/*<total /> */}
          <img src={ticketIcon} alt="House icon" className="icon" />
        </div>
      </section>
      <section onClick={() => handleCardClick("Fines")} className="Card">
        <article className="art">
          <h4>Fines</h4>
          <i className="fa-solid fa-user-group"></i>
        </article>
        <div className="resident-info">
          {/*<<NumberOfFined /> */}
          <img src={fineIcon} alt="House icon" className="icon" />
        </div>
      </section>
      <section onClick={openSignUp} className="Card">
        <article className="art">
          <h4>Add Person</h4>
          <i className="fa-solid fa-ticket"></i>
        </article>
        <div className="resident-info">
          {/*<<NumberOfFined /> */}
          <img src={addUserIcon} alt="House icon" className="icon" />
        </div>
      </section>
    </article>
  );
}

export default CardsHome;
export { CardsTask };
