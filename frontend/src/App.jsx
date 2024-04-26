import FaceAuth from './pages/FaceAuth'
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Auth0Provider, useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "./components/Loading";

const ProtectedRoute = ({ component, options }) => {
  const defaultOptions = {
    onRedirecting: () => null
  };
  const combinedOptions = { ...defaultOptions, ...options };
  const Component = withAuthenticationRequired(component, combinedOptions);
  return <Component />;
};

const CustomAuth0Provider = ({ children }) => {
  const navigate = useNavigate()
  const { isLoading } = useAuth0();
  const onRedirectCallback = appState => {
    navigate((appState && appState.returnTo) || '/profile')
  }
  return (
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
        onRedirectCallback={onRedirectCallback}
        >
        {children}
      </Auth0Provider>
  )
}

const App = () => {
   const { isLoading, error } = useAuth0();

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
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="/face" element={<FaceAuth />} />
          </Routes>
        </CustomAuth0Provider>
      </BrowserRouter>
  );
}

export default App;
