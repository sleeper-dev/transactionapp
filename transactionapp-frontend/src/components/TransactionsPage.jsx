import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_API_URL, TABLE_SIZE } from "../utils/constants";
import Spinner from "./Spinner";
import TransactionTable from "./TransactionTable";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = TABLE_SIZE;

  const fetchTransactions = async () => {
    const token = localStorage.getItem("jwtToken");
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_API_URL}/transactions?page=${page - 1}&size=${size}`,
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
        setTransactions(data.content);
        setTotalCount(data.totalElements);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mb-5 mt-5 flex w-full justify-between">
        <h1 className="text-2xl font-bold text-zinc-800">Your transactions</h1>
      </div>
      <TransactionTable
        data={transactions}
        totalCount={totalCount}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default TransactionsPage;
