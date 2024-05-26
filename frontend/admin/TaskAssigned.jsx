import React, { useEffect, useRef } from "react";
import './TaskAssigned.css';

function TaskAssigned({ isAssigned, close}) {
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            close("TaskAssigned");
        }
    };

    useEffect(() => {
        if (isAssigned) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isAssigned]);

    return (
        <>
            {isAssigned && <div className="overlay" />}
            <article ref={wrapperRef} className={isAssigned ? "box_open" : "box"}>
                <section className="bottom">
                    <h5>Task Assigned!!</h5>
                </section>
            </article>
        </>
    );
}

export default TaskAssigned;
