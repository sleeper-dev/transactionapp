import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("jwtToken");

    setIsAuthenticated(false);

    navigate("/login");

    toast.success("You have signed out successfully");
  };

  return { logout };
};
