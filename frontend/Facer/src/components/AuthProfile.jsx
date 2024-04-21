import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../pages/Profile.css'

const AuthProfile = () => {
  const { user, logout, isAuthenticated} = useAuth0();

  return (isAuthenticated && ( 
    <div className="profile-wrapper">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    </div>
  ));
};

export default AuthProfile;