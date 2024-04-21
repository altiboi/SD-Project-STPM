import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css'

const Profile = () => {
  const { user, logout } = useAuth0();

  return (
    <div className="profile-wrapper">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;