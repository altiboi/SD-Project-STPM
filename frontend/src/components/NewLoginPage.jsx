import * as React from "react";
import Form from "./Form";
import "./NewLoginPage.css";
import logo from "../assets/logo.png";

function LoginPage({ handleLogin, handleFace }) {
  return (
    <div className="flex w-full h-screen">
      <div
        className="w-full flex items-center justify-center lg:w-1/2"
        style={{ backgroundColor: "rgb(28, 41, 73)" }}
      >
        <Form handleLogin={handleLogin} handleFace={handleFace} />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="relative w-48 h-48 rounded-full animate-bounce flex items-center justify-center p-4">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div className="w-full h-1/2 absolute bottom-0"></div>
      </div>
    </div>
  );
}

export default LoginPage;
