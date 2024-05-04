import React from "react";
import loading from "../assets/loading.svg";
import "./Loading.css";

const Loading = () => (
  <div className="loading-container">
    <img src={loading} alt="Loading" className="spinner" />
  </div>
);

export default Loading;
