import { useEffect, useState } from "react";
import { fetchExchangeRates } from "../lib/exchangeRates";
import Spinner from "./Spinner";

function CurrencyRateTable() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const data = await fetchExchangeRates();
        setExchangeRates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getExchangeRates();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-h-[30rem] w-2/5 overflow-hidden rounded-2xl bg-slate-200 p-5 shadow-md">
      <h2 className="mb-3 text-lg font-semibold text-zinc-800">
        Exchange rates for EUR
      </h2>
      <div className="h-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
        {exchangeRates.map((rate) => (
          <div
            className="grid grid-cols-2 border-b border-gray-300 p-2 text-sm font-medium"
            key={rate.currencyTo}
          >
            <span>{rate.currencyTo}</span>
            <span>{rate.exchangeRate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrencyRateTable;
