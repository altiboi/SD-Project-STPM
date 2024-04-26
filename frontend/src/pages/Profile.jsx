import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css'
 import Loading from "../components/Loading";

const Profile = () => {
  const { user, logout, isAuthenticated} = useAuth0();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false); // Track component readiness

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`/api/userRole?email=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setRole(data.role);
        } else {
          console.error('Failed to fetch user role:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
        setIsReady(true); // Set component readiness
      }
    };

    if (isAuthenticated && user.email) {
      fetchUserRole();
    }
  }, [isAuthenticated, user]);

  if (!isReady) {
    return <Loading />; // Render nothing if component is not ready
  }

  return (
    isAuthenticated && (
      <div className="profile-wrapper">
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <p>Role: {role}</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </div>
    )
  );
};

export default Profile;