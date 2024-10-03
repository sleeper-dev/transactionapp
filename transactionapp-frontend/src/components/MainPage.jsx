import { useEffect, useState } from "react";
import { BASE_API_URL, CURRENCIES } from "../utils/constants";
import Spinner from "./Spinner";
import TransactionTableSmall from "./transactions/TransactionTableSmall";
import CurrencyRateTable from "./CurrencyRateTable";

function MainPage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${BASE_API_URL}/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const { firstname, lastname, email, balance, receivedTransactions } = user;

  return (
    <>
      <div className="mb-5 flex w-full justify-between rounded-2xl bg-slate-200 p-5 shadow-md">
        <h1 className="text-xl font-bold text-zinc-800">
          Welcome, {firstname}
        </h1>
      </div>
      <div className="flex flex-grow flex-row gap-5">
        <div className="flex w-3/5 flex-col gap-5">
          <div className="rounded-2xl bg-slate-200 p-5 py-5 shadow-md">
            <h2 className="mb-3 text-lg font-semibold text-zinc-800">
              Your balance
            </h2>
            <p className="text-4xl">{balance.toFixed(2)} €</p>
          </div>
          <div className="rounded-2xl bg-slate-200 py-5 shadow-md">
            <h2 className="mb-3 px-5 text-lg font-semibold text-zinc-800">
              Recent received transactions
            </h2>

            {receivedTransactions?.length > 0 ? (
              <TransactionTableSmall data={receivedTransactions} />
            ) : (
              <p className="mt-10 text-center">
                You haven't received any transactions yet.
              </p>
            )}
          </div>
        </div>
        <div className="max-h-[30rem] w-2/5 overflow-hidden rounded-2xl bg-slate-200 p-5 shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-zinc-800">
            Exchange rates for{" "}
            <select
              className="bg-transparent p-0 font-semibold text-green-600 outline-green-600"
              id="currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </h2>
          <CurrencyRateTable selectedCurrency={selectedCurrency} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
