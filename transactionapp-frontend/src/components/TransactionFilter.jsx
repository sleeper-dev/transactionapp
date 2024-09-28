function TransactionFilter({ filter, onFilterChange }) {
  return (
    <div className="flex gap-2 rounded-md border p-1 shadow-md">
      <button
        className={`rounded-md px-2 transition duration-200 hover:bg-green-700 hover:text-white ${
          filter === "all" ? "cursor-not-allowed bg-green-700 text-white" : ""
        }`}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={`rounded-md px-2 transition duration-200 hover:bg-green-700 hover:text-white ${
          filter === "sent" ? "cursor-not-allowed bg-green-700 text-white" : ""
        }`}
        onClick={() => onFilterChange("sent")}
      >
        Sent
      </button>
      <button
        className={`rounded-md px-2 transition duration-200 hover:bg-green-700 hover:text-white ${
          filter === "received"
            ? "cursor-not-allowed bg-green-700 text-white"
            : ""
        }`}
        onClick={() => onFilterChange("received")}
      >
        Received
      </button>
    </div>
  );
}

export default TransactionFilter;
