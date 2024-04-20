import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const providerConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  onRedirectCallback: (appState) => {
    const navigate = useNavigate();
    navigate(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
  },
  authorizationParams: {
    redirect_uri: window.location.origin
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Auth0Provider {...providerConfig}>
        <App />
      </Auth0Provider>
  </React.StrictMode>
);

// domain: "dev-zteqhri2btzuf6hl.us.auth0.com",
// clientId: "Cz3lKocVPMzFieF7xFxlrHhCKcnQjxM2"