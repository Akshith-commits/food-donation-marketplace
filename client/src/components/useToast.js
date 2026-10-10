import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      addToast: (msg) => console.log("[Toast]", msg),
    };
  }
  return ctx;
}
