import React from "react";
import  { useState, useEffect } from 'react';
import './TaskAssigned.css'

function TaskAssigned({TaskName,AssignedTo,RequestedBy,isAssigned,close,time}){
   
    return(
         <article className={isAssigned ? "box_open":"box"}>
            <section className="above"><article className="x"><p onClick={()=>{close("Assigned")}}>x</p></article></section>
            <section className="bottom">
                <h5>Task Assigned!!</h5>
                
            </section>
         </article>
    );
}
export default TaskAssigned;