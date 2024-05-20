import React from "react";
import pp from './pp.png';
import './SideBar.css';


function SideBar({isOpen,CloseSideBar,ViewActivits,download}){
    return(
        <article className={isOpen ? "SideBar":"SideBar_close"}>
            <section className="SectionS1">
            <p className="Outside"><p className="Inside"><p onClick={()=>{CloseSideBar("SideBar")}} >x</p></p></p>
            <article className="InsideArticle">
                <img src={pp} alt="profile picture" />
                <p>Admin Name</p>
            </article>
           
            </section>
            <section className="SectionS2">
                <ul>
                    <li onClick={()=>{ViewActivits('home')}}>Home</li>
                    <li onClick={()=>{ViewActivits('task')}} >Tasks</li>
                    <li onClick={()=>{download()}}>Report</li>
                    <li>Account</li>
                    <li>Log out</li>
                </ul>
                </section>
        </article>
    );
};

export default SideBar;