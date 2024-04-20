import FaceAuth from './pages/FaceAuth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/face" element={<FaceAuth />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
