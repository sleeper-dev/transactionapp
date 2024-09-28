import { useParams } from "react-router-dom";

function TransactionSingle() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Transaction #{id}</h1>
    </div>
  );
}

export default TransactionSingle;
