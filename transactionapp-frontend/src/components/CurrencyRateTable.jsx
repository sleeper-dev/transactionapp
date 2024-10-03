import { useEffect, useState } from "react";
import Spinner from "./Spinner";

function CurrencyRateTable({ selectedCurrency }) {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/8d578a07aee90c82eb3a8c36/latest/${selectedCurrency}`,
        );
        const data = await response.json();
        console.log(data);
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.log("Failed to fetch exchange rates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency]);

  if (isLoading) return <Spinner />;

  return (
    <div className="h-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
      {Object.entries(exchangeRates).map(([currency, rate]) => (
        <div
          className="grid grid-cols-2 border-b border-gray-300 p-2 text-sm font-medium"
          key={rate.currencyTo}
        >
          <span>{currency}</span>
          <span>{rate}</span>
        </div>
      ))}
    </div>
  );
}

export default CurrencyRateTable;
