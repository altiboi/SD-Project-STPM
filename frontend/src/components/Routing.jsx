import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Login from "../pages/Login/Login";
import Dashboard from "../Dashboard";
import FaceRecognition from "../pages/Login/FaceAuth";
import App from "../../admin/App";

const fetchUser = async (user, setUserData, setIsReady) => {
  try {
    const response = await fetch(`https://blocbuddyapi.azurewebsites.net/api/getUser?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    });
    if (response.ok) {
      const data = await response.json();
      setUserData({
        user_id: data._id,
        role: data.Role,
        phoneNumber: data.Phone,
        propName: data.PropertyName,
        name: data.Name,
        unitID: data.UnitID,
        lastLogin: data.lastLogin
      });
    } else {
      console.error('Failed to fetch user:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  } finally {
    setIsReady(true); // Set component readiness
  }
};

const ProtectedRoute = ({ Component1, Component2 }) => {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState({
    user_id: null,
    role: null,
    phoneNumber: null,
    propName: null,
    name: null,
    unitID: null,
    lastLogin: null
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await fetch(`https://blocbuddyapi.azurewebsites.net/api/getUser?`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email : user.email})
              });
          if (response.ok) {
            const data = await response.json();
            setUserData({
              user_id: data._id,
              role: data.Role,
              phoneNumber: data.Phone,
              propName: data.PropertyName,
              name: data.Name,
              unitID: data.UnitID,
              lastLogin: data.lastLogin
            });
          } else {
            console.error('Failed to fetch user:', response.status, response.statusText);
          }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsReady(true); // Set component readiness
      }
    };
    if (isAuthenticated && user) {
      fetchUser(user, setUserData, setIsReady);
    }
  }, [isAuthenticated, user]);



  if (isAuthenticated) {
    if(userData.role === "Resident" || userData.role === "Staff"){
       return <Component1 /> ;
    }
    else if(userData.role === "Admin"){
      return <Component2/>
    }else{
      <h5>Hello world !</h5>
    }
  } else {
    return <Login />;
  }
};

const CustomAuth0Provider = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    if (isAuth && !isAuthenticated) {
      navigate(window.location.pathname);
    }
  }, [isAuthenticated, navigate]);

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

const Routing = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("isAuthenticated:", isAuthenticated);
  }, [isLoading, isAuthenticated]);

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <BrowserRouter>
      <CustomAuth0Provider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute Component1={Dashboard} Component2={App} />} />
          <Route path="/face" element={<FaceRecognition />} />
        </Routes>
      </CustomAuth0Provider>
    </BrowserRouter>
  );
};

export default Routing;
