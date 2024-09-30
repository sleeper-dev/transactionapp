import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import toast from "react-hot-toast";

export default function useRefund() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const refundTransaction = async (transactionId) => {
    const token = localStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_API_URL}/transactions/${transactionId}/refund`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        navigate(`/transactions/${data.id}`);
        toast.success("Refund successful");
      } else {
        const data = await response.json();
        toast.error(data.message || "Refund failed");
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { refundTransaction, isLoading };
}
