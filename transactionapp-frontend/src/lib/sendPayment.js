import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";

function sendPayment() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("jwtToken");

  const send = async (email, amount, description) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/payment/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, amount, description }),
      });

      if (response.ok) {
        const data = await response.json();

        navigate(`/transactions/${data.id}`);
        toast.success("Payment successful");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "There was an error");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { send, isLoading };
}

export default sendPayment;
