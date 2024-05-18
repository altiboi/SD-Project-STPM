import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const useAuth = () => {
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          localStorage.setItem("auth_token", token);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isAuthenticated");
        }
      } catch (error) {
        console.error("Error getting token", error);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("isAuthenticated");
    logout({ returnTo: window.location.origin });
  };

  return { isAuthenticated, handleLogin, handleLogout };
};

export default useAuth;
