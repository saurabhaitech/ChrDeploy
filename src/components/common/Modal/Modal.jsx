import React from "react";
import { IoMdClose } from "react-icons/io";

//  use { isOpen = true, onClose, children } to see the test modal
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-dark bg-opacity-60">
          <div className="w-[90%] overflow-hidden min-h-[316px] md:w-[482px] md:min-h-[287px] bg-light p-4 md:p-10 rounded-lg relative">
            <button onClick={onClose} className="absolute top-0 right-0 m-2">
              <IoMdClose />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
