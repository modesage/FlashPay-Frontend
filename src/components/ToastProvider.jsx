import { createContext, useContext, useState, useCallback } from "react";

const ToastCtx = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-lg shadow text-white ${
              t.type === "error"
                ? "bg-red-600"
                : t.type === "success"
                ? "bg-green-600"
                : "bg-gray-800"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

export const useToast = () => useContext(ToastCtx);
