import React, { useEffect, useRef } from 'react';
import './TheTicket.css';
import TicketsInfor from './TicketsInfor';

function TheTicket({ isClicked, name, handleCardClick, onClose }) {
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onClose("Assigned");
        }
    };

    useEffect(() => {
        if (isClicked) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isClicked]);

    return (
        <>
            {isClicked && <div className="overlay" />}
            <article ref={wrapperRef} id="pop" className={isClicked ? "pop1_open" : "pop1"}>
                <TicketsInfor personName={name} handleCardClick={handleCardClick} />
            </article>
        </>
    );
}

export default TheTicket;
