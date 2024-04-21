import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter, useNavigate} from 'react-router-dom';

// const onRedirectCallback = (appState) => {
//   const navigate = useNavigate();
//   navigate(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
// };

// const providerConfig = {
//   domain: process.env.REACT_APP_AUTH0_DOMAIN,
//   clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
//   onRedirectCallback,
//   authorizationParams: {
//     redirect_uri: window.location.origin
//   }
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);

// domain: "dev-zteqhri2btzuf6hl.us.auth0.com",
// clientId: "Cz3lKocVPMzFieF7xFxlrHhCKcnQjxM2"