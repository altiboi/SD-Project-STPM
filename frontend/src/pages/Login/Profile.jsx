import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css';
import Loading from "../../components/Loading";

const Profile = ({ userData }) => {
  const { user, logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated ? (
      <div className="body">
        <div className="profile-wrapper">
          <div className="profile-header">
            <img src={user.picture} alt="Profile" className="profile-picture" />
            <h2>{userData.name}</h2>
          </div>
          <div className="profile-details">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Number:</strong> {userData.phoneNumber}</p>
            <p><strong>Property Name:</strong> {userData.propName}</p>
            <p><strong>Unit Number:</strong> {userData.unitID}</p>
          </div>
        </div>
      </div>
    ) : <Loading />
  );
};

export default Profile;
