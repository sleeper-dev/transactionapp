import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import Spinner from "../components/Spinner";
import { format } from "date-fns";

function TransactionSingle() {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTransaction = async () => {
    const token = localStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_API_URL}/transactions/${transactionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setTransaction(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [transactionId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!transaction) {
    return (
      <div>
        <h1 className="mb-5 text-2xl font-bold text-zinc-800">
          Transaction not found!
        </h1>
      </div>
    );
  }

  const {
    id,
    amount,
    dateCreated,
    description,
    counterpartFirstname: firstname,
    counterpartLastname: lastname,
    counterpartEmail: email,
    sender: isSender,
  } = transaction;

  return (
    <div className="p-5">
      <button
        onClick={() => navigate(-1)}
        className="back-button mb-2 rounded-md border border-green-600 px-2 py-1 font-medium text-green-600 transition duration-200 hover:bg-green-600 hover:text-white"
      >
        {"<"} Go back
      </button>
      <h1 className="mb-5 text-2xl font-bold text-zinc-800">
        Transaction Details
      </h1>
      <div className="rounded-lg bg-white p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold">
              {firstname} {lastname}
            </span>
            <span>{email}</span>
          </div>
          <span className="font-medium">
            {format(new Date(dateCreated), "dd.MM.yyyy, hh:mm aa")}
          </span>
        </div>
        <div className="my-6 border-y border-gray-200 py-5">
          <span className="text-4xl font-medium">
            {isSender ? "-" : "+"}
            {amount.toFixed(2)} €
          </span>
        </div>

        <div className="flex flex-col">
          <h4 className="text-md text-gray-600">Description</h4>
          <p className="text-lg font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionSingle;
