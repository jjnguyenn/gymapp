import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id === "modal-backdrop") {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
    >
      <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 rounded-xl shadow-xl max-w-lg w-full transition-all duration-300 transform">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 transition"
        >
          ✕
        </button>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
