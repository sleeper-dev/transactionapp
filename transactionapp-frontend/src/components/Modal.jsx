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
    <div className="fixed left-0 top-0 z-[1000] flex h-screen w-full items-center justify-center bg-black bg-opacity-30 px-6 backdrop-blur-sm transition-all duration-500 md:px-0">
      <div
        className="flex w-full flex-col rounded-lg bg-gray-100 px-10 pb-10 pt-6 shadow-lg transition duration-500 md:w-min"
        ref={ref}
      >
        <button
          className="self-end border-none bg-none transition-all duration-200"
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
