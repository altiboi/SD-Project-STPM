import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  Auth0Provider,
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import Login from "../pages/Login/Login";
import Profile from "../pages/Login/Profile";
import Dashboard from "../Dashboard";
import FaceRecognition from "../pages/Login/FaceAuth";

const ProtectedRoute = ({ component: Component, options }) => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <Component />;
  } else {
    const defaultOptions = {
      onRedirecting: () => null,
    };
    const combinedOptions = { ...defaultOptions, ...options };
    const ProtectedComponent = withAuthenticationRequired(Component, combinedOptions);
    return <ProtectedComponent />;
  }
};

const CustomAuth0Provider = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading } = useAuth0();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate(window.location.pathname);
    }
  }, []);

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

  //  if (isLoading) {
  //    return <Loading />;
  //  }

  return (
    <BrowserRouter>
      <CustomAuth0Provider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
                    />
          <Route path="/face" element={<FaceRecognition />} />
        </Routes>
      </CustomAuth0Provider>
    </BrowserRouter>
  );
};

export default Routing;
