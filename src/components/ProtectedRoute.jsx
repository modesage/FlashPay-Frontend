import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../lib/api";

export const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        await api.get("/user/me");
        setIsValid(true);
      } catch {
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
