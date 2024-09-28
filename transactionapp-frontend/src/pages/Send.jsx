import Modal from "../components/Modal";
import SendPage from "../components/SendPage";

function Send() {
  return (
    <div className="flex justify-center">
      <Modal>
        <SendPage />
      </Modal>
    </div>
  );
}

export default Send;
