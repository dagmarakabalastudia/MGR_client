import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import "./ToastComponent.css";

const ToastContext = createContext({ addToast: (message, type) => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className="toastComponent">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toastComponent__item ${toast.type}`}
            >
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
