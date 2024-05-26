import React from "react";
import "./Login.css";
import LoginPage from "../../components/NewLoginPage";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }

  function handleFace() {
    navigate("/face");
  }

  return <LoginPage handleLogin={handleLogin} handleFace={handleFace} />;
}

export default Login;
