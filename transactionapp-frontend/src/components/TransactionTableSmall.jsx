import { format } from "date-fns";

function TransactionTableSmall({ data }) {
  return (
    <div className="flex flex-col text-sm font-medium">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-row justify-between border-b border-slate-400 border-opacity-50 bg-slate-300 bg-opacity-50 px-5 py-4 last:border-none"
        >
          <span className="w-1/3">{item.senderEmail}</span>
          <span className="w-1/6">{item.amount.toFixed(2)} €</span>
          <span className="w-1/6">
            {format(item.dateCreated, "dd.MM.yyyy")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TransactionTableSmall;
