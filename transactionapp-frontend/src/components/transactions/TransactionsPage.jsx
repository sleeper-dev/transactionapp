import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_API_URL, TABLE_SIZE } from "../../utils/constants";
import Spinner from "../Spinner";
import TransactionTable from "./TransactionTable";
import TransactionFilter from "./TransactionFilter";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = TABLE_SIZE;

  const sortBy = searchParams.get("sortBy") || "dateCreated-desc";
  const filter = searchParams.get("filter") || "all";

  const fetchTransactions = async () => {
    const token = localStorage.getItem("jwtToken");
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_API_URL}/transactions?page=${page - 1}&size=${size}&sortBy=${sortBy}&filter=${filter}`,
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
  }, [page, sortBy, filter]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, sortBy, filter });
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSearchParams({ page: 1, sortBy: newSortBy, filter });
  };

  const handleFilterChange = (newFilter) => {
    setSearchParams({ page: 1, sortBy, filter: newFilter });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mb-5 mt-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800">Your transactions</h1>

        {transactions.length > 0 && (
          <div className="flex gap-2">
            <TransactionFilter
              filter={filter}
              onFilterChange={handleFilterChange}
            />
            <select
              onChange={handleSortChange}
              value={sortBy}
              className="rounded-md border p-2 py-2 text-zinc-800 shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            >
              <option value="dateCreated-desc">
                Sort by date (Newest First)
              </option>
              <option value="dateCreated-asc">
                Sort by date (Oldest First)
              </option>
              <option value="amount-desc">
                Sort by amount (Highest First)
              </option>
              <option value="amount-asc">Sort by amount (Lowest First)</option>
            </select>
          </div>
        )}
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
