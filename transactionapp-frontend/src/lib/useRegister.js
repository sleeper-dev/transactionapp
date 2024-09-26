import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import toast from "react-hot-toast";

function useRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        navigate("/login");
        toast.success("Registration successful");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return { register, isLoading };
}

export default useRegister;
