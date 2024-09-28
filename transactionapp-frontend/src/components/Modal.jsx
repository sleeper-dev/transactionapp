import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../lib/useOutsideClick";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-[1000] h-screen w-full bg-black bg-opacity-30 backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-100 p-10 shadow-lg transition duration-500"
        ref={ref}
      >
        <button
          className="absolute right-4 top-4 translate-x-1 transform border-none bg-none p-2 transition-all duration-200"
          onClick={close}
        >
          &#10005;
        </button>

        <div>{cloneElement(children, { onClose: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
export { ModalContext };
