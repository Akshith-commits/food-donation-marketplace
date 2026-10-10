import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContext } from "./ToastContext";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-viewport" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999, display: "flex", flexDirection: "column", gap: "0.6rem", pointerEvents: "none" }}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{ pointerEvents: "all" }}
              className={`toast-banner toast-${toast.type}`}
            >
              <div className="toast-icon">
                {toast.type === "success" && "✓"}
                {toast.type === "info" && "ℹ"}
                {toast.type === "warning" && "⚠️"}
              </div>
              <div className="toast-text">{toast.message}</div>
              <button
                type="button"
                className="toast-close"
                onClick={() => removeToast(toast.id)}
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
