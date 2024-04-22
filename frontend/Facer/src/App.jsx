import FaceAuth from './pages/FaceAuth'
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Auth0Provider, useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import AuthProfile from './components/AuthProfile';

const ProtectedRoute1 = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  console.log("isAuthenticated: ", isAuthenticated)

  return isAuthenticated ? element : ( <Navigate to="/login" />);
};

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

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
        <Auth0ProviderWithRedirectCallback
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}>
            <AuthProfile></AuthProfile>
          <Routes>
            <Route index element={<Login />} />
            <Route exact path="/profile" element={<ProtectedRoute component={Profile}/>}/>
            
            <Route path="/login" element={<Login />} />
            <Route path="/face" element={<FaceAuth />} />
          </Routes>
        </Auth0ProviderWithRedirectCallback>
      </BrowserRouter>
  );
}

export default App;
