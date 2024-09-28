import { format } from "date-fns";

function TransactionTableSmall({ data }) {
  return (
    <div className="flex flex-col text-sm font-medium">
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[3fr_1.5fr_1fr] justify-between border-b border-slate-400 border-opacity-50 bg-slate-50 bg-opacity-50 px-5 py-4 last:border-none"
        >
          <span className="truncate">{item.counterpartEmail}</span>
          <span>{item.amount.toFixed(2)} €</span>
          <span>{format(item.dateCreated, "dd.MM.yyyy")}</span>
        </div>
      ))}
    </div>
  );
}

export default TransactionTableSmall;
