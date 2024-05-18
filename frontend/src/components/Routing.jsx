import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Login from "../pages/Login/Login";
import Profile from "../pages/Login/Profile";
import Dashboard from "../Dashboard";
import FaceRecognition from "../pages/Login/FaceAuth";
import useAuth from "./useAuth";

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Login />;
  }
};

const CustomAuth0Provider = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth0();

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

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <BrowserRouter>
      <CustomAuth0Provider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/face" element={<FaceRecognition />} />
        </Routes>
      </CustomAuth0Provider>
    </BrowserRouter>
  );
};

export default Routing;