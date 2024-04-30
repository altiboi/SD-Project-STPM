import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css'
 import Loading from "../../components/Loading";

const Profile = () => {
  const { user, logout, isAuthenticated} = useAuth0();
  const [role, setRole] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [propName, setPropName] = useState(null);
  const [Name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false); // Track component readiness

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
          const response = await fetch(`https://blocbuddyapi.azurewebsites.net/api/getUser?code=Ck8uIBDdT33M-VtQe1FFX_mwzwREjm3N4MjS7ySEfUO0AzFuYmSb_g==`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email : user.email})
              });
          if (response.ok) {
            const data = await response.json();
            setRole(data.Role);
            setPhoneNumber(data.Phone);
            setPropName(data.PropertyName);
            setName(data.Name);
          } else {
            console.error('Failed to fetch user:', response.status, response.statusText);
          }
      } catch (error) {
        console.error('Error fetching user:', error);
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
    return null; // Render nothing if component is not ready
  }

  return (
    isAuthenticated && (
      <div className="profile-wrapper">
        <h2>Welcome, {Name}!</h2>
        <p>Email: {user.email}</p>
        <p>Role: {role}</p>
        <p>Number: {phoneNumber}</p>
        <p>Property Name: {propName}</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </div>
    )
  );
};

export default Profile;