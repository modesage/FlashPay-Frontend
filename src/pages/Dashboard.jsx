import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Users } from "../components/Users";
import { Header } from "../components/Header";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await api.get("/account/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shared Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-sm uppercase tracking-wide opacity-80">
              Available Balance
            </h2>
            <p className="text-3xl sm:text-4xl font-bold mt-2">₹ {balance}</p>
          </div>
          {/* Placeholder circle to mimic icon (hidden on mobile) */}
          <div className="hidden sm:flex h-12 w-12 flex items-center justify-center bg-white/20 rounded-full shrink-0">
            <span className="text-lg sm:text-xl font-semibold">₹</span>
          </div>
        </div>

        {/* Send Money Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Send Money
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Search for a user and send money instantly.
          </p>
          <Users />
        </div>
      </main>
    </div>
  );
};
