import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css'
 import Loading from "../../components/Loading";

const Profile = ({ userData }) => {
  const { user, logout, isAuthenticated} = useAuth0();

  return (
    isAuthenticated && (
      <div className="Body">
        <div className="profile-wrapper">
        <h2>Hi, {userData.name}!</h2>
        <p>Email: {user.email}</p>
        <p>Role: {userData.role}</p>
        <p>Number: {userData.phoneNumber}</p>
        <p>Property Name: {userData.propName}</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </div>
      </div>
    )
  );
};

export default Profile;