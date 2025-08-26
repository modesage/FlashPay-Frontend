import { useState, useEffect } from "react";
import { api } from "../lib/api";

export const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/account/balance");
        setBalance(res.data.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-between bg-white shadow rounded-lg p-4">
      <div className="text-lg font-bold text-gray-700">Your Balance</div>
      <div className="text-lg font-semibold text-gray-900">Rs {balance}</div>
    </div>
  );
};
