import React from "react";
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

function Login()
{


    const navigator = useNavigate()
    function handleClick (){
        navigator("/face")
    }


    return (
        <div className="wrapper">
           <form action="">
            <h1>Welcome</h1>
            <div className="input-box">
                <input type="text"  placeholder="Username" required/>
                <FaUser className="icon" />
                
            </div>
            <div className="input-box">
                <input type="password"  placeholder="Password" required/>
                <FaLock className="icon" />
            </div>

            <br />

            <button type="submit">Login</button>




            </form> 

            <br />

            <button onClick={handleClick}>Face R</button>




        </div>
    );
};

export default Login;