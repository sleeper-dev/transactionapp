import { format } from "date-fns";
import { Link } from "react-router-dom";
import { TABLE_SIZE } from "../utils/constants";

function TransactionTable({ data, page, totalCount, handlePageChange }) {
  const size = TABLE_SIZE;

  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalCount);

  const totalPages = Math.ceil(totalCount / size);

  const isEmpty = !data.length > 0;

  return (
    <div className="w-full overflow-hidden rounded-2xl border-[1px] border-gray-200 text-zinc-700">
      <div>
        <div className="flex flex-col">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 bg-slate-200 px-5 py-4 font-bold">
            <span>Name</span>
            <span>Amount</span>
            <span>Date</span>
            <span></span>
          </div>
          {!isEmpty ? (
            data.map((transaction, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4"
              >
                <span className="flex flex-col truncate">
                  <span className="font-bold">{`${transaction.counterpartFirstname} ${transaction.counterpartLastname}`}</span>
                  <span className="text-sm">
                    {transaction.counterpartEmail}
                  </span>
                </span>
                <span
                  className={`font-semibold ${transaction.sender ? "text-red-600" : "text-green-700"}`}
                >
                  {transaction.sender ? "-" : "+"}
                  {transaction.amount.toFixed(2)}
                </span>
                <span className="font-medium">
                  {format(transaction.dateCreated, "dd.MM.yyyy")}
                </span>
                <span className="text-right">
                  <Link
                    to={`/transaction/1`}
                    target="_blank"
                    className="text-green-700 hover:underline"
                  >
                    View Details
                  </Link>
                </span>
              </div>
            ))
          ) : (
            <div className="items-center gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xl">No transactions yet!</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between bg-slate-200 px-5 py-4">
          {!isEmpty ? (
            <span className="font-medium">
              Showing <span className="font-bold">{startItem}</span> to{" "}
              <span className="font-bold">{endItem}</span> of{" "}
              <span className="font-bold">{totalCount}</span> results
            </span>
          ) : (
            <span></span>
          )}
          <div>
            <button
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="mr-3 rounded px-3 py-1 transition duration-200 hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {"< Previous"}
            </button>
            <button
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
              disabled={page >= totalPages}
              className="rounded px-3 py-1 transition duration-200 hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {"Next >"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
