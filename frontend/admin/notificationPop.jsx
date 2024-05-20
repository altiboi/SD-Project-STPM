import React from "react";
import './NotificationPop.css'

function NotificationPop({ isFineTicketOpen , handleCardClick ,personName ,isOpen}){
    return (
        <section id="TicketsPop" className={isOpen ? "Tickets_open" :"Tickets"}>
            <article onClick={() => handleCardClick('cNotification')} style={{ '--clr': '#ff1867' }} className="popTicket red">
                <section>
                    <h5>Create Notification <i className="fa-solid fa-envelope"></i></h5>
                </section>
             
            </article>
            <article onClick={() => handleCardClick('History')} style={{ '--clr': '#1e9bff' }} className="popTicket">
                <section>
                    <h5>History <i className="fa-sharp fa-solid fa-circle-check"></i></h5>
                </section>
       
            </article>
        </section>
    );
}

export default NotificationPop;