import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { useToast } from "../components/ToastProvider";
import { Header } from "../components/Header";

export const ManageBalance = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const toast = useToast();

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

  const onDeposit = async () => {
    const n = Number(amount);
    if (!n || n <= 0) return toast.push("Enter a valid amount", "error");
    try {
      await api.post("/account/deposit", { amount: n });
      toast.push(`₹${n} deposited`, "success");
      setAmount("");
      fetchBalance();
    } catch (e) {
      toast.push(e?.response?.data?.message || "Deposit failed", "error");
    }
  };

  const onWithdraw = async () => {
    const n = Number(amount);
    if (!n || n <= 0) return toast.push("Enter a valid amount", "error");
    try {
      await api.post("/account/withdraw", { amount: n });
      toast.push(`₹${n} withdrawn`, "success");
      setAmount("");
      fetchBalance();
    } catch (e) {
      toast.push(e?.response?.data?.message || "Withdraw failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shared Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm uppercase tracking-wide opacity-80">
                Available Balance
              </h2>
              <p className="text-3xl font-bold mt-2">₹ {balance}</p>
            </div>
            {/* Placeholder circle to mimic icon (hidden on mobile) */}
            <div className="hidden sm:flex h-12 w-12 flex items-center justify-center bg-white/20 rounded-full shrink-0">
              <span className="text-lg sm:text-xl font-semibold">₹</span>
            </div>
          </div>
        </div>

        {/* Manage Balance Form */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Manage Your Balance
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Deposit or withdraw funds securely from your account.
          </p>

          {/* Amount Input */}
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onDeposit}
              className="flex-1 py-2 cursor-pointer rounded-lg bg-customGrey hover:bg-customBlack text-white font-medium transition"
            >
              Deposit
            </button>
            <button
              onClick={onWithdraw}
              className="flex-1 py-2 cursor-pointer rounded-lg bg-customGrey hover:bg-customBlack text-white font-medium transition"
            >
              Withdraw
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
