import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth"; // Assuming you have the `useAuth` hook


const RedirectIfAuthenticated = ({ children }) => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  // If the user is authenticated, redirect them to the homepage (or any other route)
  if (auth?.token) {
    
    navigate("/", { replace: true });
    return null;
  }

  return children;
};

export default RedirectIfAuthenticated;
