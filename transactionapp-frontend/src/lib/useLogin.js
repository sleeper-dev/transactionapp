import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { BASE_API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("jwtToken", data.jwt);
        setIsAuthenticated(true);

        toast.success("You have successully logged in");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "There was an error");
      }
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}

export default useLogin;
