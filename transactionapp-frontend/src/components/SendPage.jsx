import { useContext, useState } from "react";
import toast from "react-hot-toast";
import sendPayment from "../lib/sendPayment.js";
import { BASE_API_URL } from "../utils/constants";
import Modal, { ModalContext } from "./Modal.jsx";

function SendPage() {
  const { open } = useContext(ModalContext);
  const [isValidating, setIsValidating] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  const { send, isLoading } = sendPayment();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const amount = formData.get("amount");
    const description = formData.get("description");

    const token = localStorage.getItem("jwtToken");

    setIsValidating(true);
    try {
      const response = await fetch(`${BASE_API_URL}/payment/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, amount, description }),
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentData(data);
        open("confirmModal");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsValidating(false);
    }
  }

  return (
    <div className="mt-5 w-[30rem]">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Send payment
      </h2>
      <form
        className="mt-5 flex flex-col space-y-6 rounded-xl bg-white p-10 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="amount"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Amount you want to send
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            required
            className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="description"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            A short description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            className="w-full rounded-md border p-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isValidating}
        >
          Send
        </button>

        <Modal.Window name="confirmModal">
          <div className="flex w-[30rem] flex-col">
            <div className="border-b border-gray-300 pb-3">
              <h3 className="mb-2 text-lg font-bold">Are you sure?</h3>
              <p className="text-base font-medium text-zinc-500">
                You are about to send{" "}
                <span className="font-semibold text-zinc-600">
                  {paymentData.amount} €
                </span>{" "}
                to{" "}
                <span className="font-semibold text-zinc-600">
                  {paymentData.email}
                </span>
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
                className="rounded-md border border-green-700 bg-green-700 px-3 py-1 text-white shadow-md transition-all duration-200 hover:bg-white hover:text-green-800"
                disabled={isLoading}
                onClick={() =>
                  send(
                    paymentData.email,
                    paymentData.amount,
                    paymentData.description,
                  )
                }
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Window>
      </form>
    </div>
  );
}

export default SendPage;
