import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { BASE_API_URL } from "../../utils/constants";
import { format } from "date-fns";
import Modal, { ModalContext } from "../Modal";
import useRefund from "../../lib/useRefund";

function TransactionSinglePage() {
  const { open } = useContext(ModalContext);
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { refundTransaction } = useRefund();
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
    refunded,
    type,
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
      <div className="mb-5 flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800">
          Transaction Details{" "}
          <span className="text text-zinc-600 underline">#{id}</span>
        </h1>
        <span
          className={`rounded-full px-3 py-1 text-base font-medium uppercase ${type === "REFUND" ? "bg-amber-200 text-amber-600" : "bg-green-200 text-green-700"}`}
        >
          {type === "REFUND" ? "Refund" : "Payment"}
        </span>
      </div>
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
        <div className="my-6 flex items-center justify-between border-y border-gray-200 py-5">
          <span
            className={`text-4xl font-medium ${refunded ? "line-through" : ""}`}
          >
            {isSender ? "-" : "+"}
            {amount.toFixed(2)} €
          </span>
          {refunded && (
            <span className="rounded-full bg-amber-200 px-3 py-1 text-base font-medium uppercase text-amber-600">
              Refunded
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <h4 className="text-md text-gray-600">Description</h4>
          <p className="text-lg font-medium">{description}</p>
        </div>
        {type === "PAYMENT" && isSender && !refunded && (
          <div className="mt-5 flex justify-end border-t border-gray-200 pt-5">
            <button
              onClick={() => open("confirmRefund")}
              className="back-button rounded-md bg-amber-200 px-5 py-2 font-medium text-amber-600 transition duration-200 hover:bg-amber-600 hover:text-white"
            >
              Refund
            </button>

            <Modal.Window name="confirmRefund">
              <div className="flex w-[30rem] flex-col">
                <div className="border-b border-gray-300 pb-3">
                  <h3 className="mb-2 text-lg font-bold">Are you sure?</h3>
                  <p className="text-base font-medium text-zinc-500">
                    Are you sure you want to request a refund for this
                    transaction?
                  </p>
                </div>
                <div className="mt-5 flex w-full flex-row justify-end gap-3">
                  <button
                    onClick={() => open(null)}
                    className="rounded-md border border-red-700 bg-red-700 px-2 py-1 text-white shadow-md transition-all duration-200 hover:bg-white hover:text-red-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => refundTransaction(transactionId)}
                    className="rounded-md border border-green-700 bg-green-700 px-3 py-1 text-white shadow-md transition-all duration-200 hover:bg-white hover:text-green-800"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Modal.Window>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionSinglePage;
