import { useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    toast.error("You're already logged in.");
    return <Navigate to="/" />;
  }

  return children;
}

export default PublicRoute;
