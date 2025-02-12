import { format } from "date-fns";
import { Link } from "react-router-dom";
import { TABLE_SIZE } from "../../utils/constants";

function TransactionTable({ data, page, totalCount, handlePageChange }) {
  const size = TABLE_SIZE;

  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalCount);

  const totalPages = Math.ceil(totalCount / size);

  const isEmpty = !data.length > 0;

  return (
    <div className="w-full overflow-hidden rounded-2xl border-[1px] border-gray-200 text-zinc-700">
      <div>
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 bg-slate-200 px-5 py-4 font-bold md:grid">
          <span>Name</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
          <span></span>
        </div>

        <div className="flex flex-col">
          {!isEmpty ? (
            data.map((transaction, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
              >
                <div className="flex flex-col">
                  <span className="font-bold">{`${transaction.counterpartFirstname} ${transaction.counterpartLastname}`}</span>
                  <span className="text-sm">
                    {transaction.counterpartEmail}
                  </span>
                </div>

                <div>
                  <span className="block font-bold md:hidden">Amount:</span>
                  <span
                    className={`font-semibold ${
                      transaction.type === "REFUND"
                        ? "text-amber-600"
                        : transaction.sender
                          ? "text-red-600"
                          : "text-green-700"
                    } ${transaction.refunded ? "line-through" : ""}`}
                  >
                    {transaction.sender ? "-" : "+"}
                    {transaction.amount.toFixed(2)} €
                  </span>
                </div>

                <div>
                  <span className="block font-bold md:hidden">Status:</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium uppercase ${
                      transaction.refunded
                        ? "bg-amber-200 text-amber-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {transaction.refunded ? "Refunded" : "Complete"}
                  </span>
                </div>

                <div>
                  <span className="block font-bold md:hidden">Date:</span>
                  <span className="font-medium">
                    {format(transaction.dateCreated, "dd.MM.yyyy")}
                  </span>
                </div>

                <div className="text-right">
                  <Link
                    to={`/transactions/${transaction.id}`}
                    className="text-green-700 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="items-center gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xl">No transactions yet!</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 bg-slate-200 px-5 py-4 md:flex-row">
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
