import React from "react";
import './SendTo.css'


function SendTo({dropDownClick ,isOpen}){
    return(
        <article className={isOpen ?"dropDown":"dropDown_close"}>
            <ul>
                <li onClick={()=>{dropDownClick("Everybody")}}>Everybody</li>
                <li onClick={()=>{dropDownClick("Stuff")}}>Stuff</li>
                <li onClick={()=>{dropDownClick("Residents")}}>Residents</li>
            </ul>
        </article>
    );
}

export default SendTo;