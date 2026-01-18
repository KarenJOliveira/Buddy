"use client";
import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("Escape key pressed, closing modal");
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      console.log("Add event listeners");
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    if (!isOpen) {
      console.log("Remove event listeners");
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    }
  }, [isOpen, onClose]); //Sempre que esses valores mudarem, as funções serão atualizadas

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div ref={modalRef}>
        <div className="bg-white rounded-lg shadow-xl w-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("portal") || document.body, // Fallback to body if portal is not found
  );
};

export default Modal;
