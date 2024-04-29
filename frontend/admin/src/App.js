import logo from './logo.svg';
import { useState } from 'react';

import './App.css';
function App(){
    return (
        <>
            <main id="main" >
                <header>
                    <nav className="navigationbar">
                        <section className="sec">
                            <img src="business.png" alt="logo of the business" />
                            <h1>The business Name</h1>
                        </section>
                        <img id="pp" src="pp.png" alt="user" />
                        <i className="fa-solid fa-ellipsis-vertical" style={{ marginRight: '10px' }}></i>
                    </nav>
                </header>
                <article className="postnav">
                    <h2>The admin name</h2>
                    <section className="sec1">
                        <h3>Activities</h3>
                    </section>
                </article>
                <article className="Cards">
                    <section  className="Card">
                        <article className="art">
                            <h4>View Residents</h4>
                            <i className="fa-solid fa-user-group"></i>
                        </article>
                      
                    </section>
                    <section className="Card">
                        <article className="art">
                            <h4>TICKETS</h4>
                            <i className="fa-solid fa-ticket"></i>
                        </article>
                       <total />
                    </section>
                    <section  className="Card">
                        <article className="art">
                            <h4>View STAFF</h4>
                            <i className="fa-solid fa-user-helmet-safety"></i>
                        </article>
                      
                    </section>
                </article>
                <article id="viewBox" className='viewBox'>
                    <section id="header" className="header">
                
                    </section>
                    <section id="viewComp" className="viewComp">
      
                    </section>
                </article>
            </main>
  
           
        </>
    );
}

export default App;
