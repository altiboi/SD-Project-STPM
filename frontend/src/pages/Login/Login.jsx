import React from "react";
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

function Login()
{
    const navigator = useNavigate()

    function handleVerify() {
        navigator("/face")
    }
    function handleLogin(){
        navigator("/dashboard")
    }

    return (
        <div className="Body">
            <div className="wrapper">
           <form action="">
            <h1>Welcome</h1>
            {/* <div className="input-box">
                <input type="text"  placeholder="Username" required/>
                <FaUser className="icon" />
                
            </div>
            <div className="input-box">
                <input type="password"  placeholder="Password" required/>
                <FaLock className="icon" />
            </div> */}

            <br />

            <button onClick={handleLogin}>Login</button>




            </form> 

            <br />

            <button onClick={handleVerify}>Verify Identity</button>




        </div>
        </div>
    );
};

export default Login;