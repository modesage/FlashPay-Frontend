import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useToast } from "../components/ToastProvider";

export const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const username = searchParams.get("username") || "";
  const id = searchParams.get("id");
  const name = `${firstName} ${lastName}`.trim();

  const handleSend = async () => {
    const num = Number(amount);
    if (!num || num <= 0) {
      toast.push("Enter a valid amount", "error");
      return;
    }
    try {
      await api.post("/account/transfer", { to: id, amount: num });
      toast.push(`₹${num} sent to ${name} (@${username})`, "success");
      navigate("/dashboard");
    } catch (err) {
      toast.push(err?.response?.data?.message || "Transfer failed", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative">
        {/* Back to Dashboard Button - Top Right */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute cursor-pointer top-4 right-4 py-2 px-4 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
        >
          Back
        </button>

        {/* Recipient Info */}
        <div className="flex items-center mb-6">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-medium">{name}</span>
            <span className="text-sm sm:text-base text-gray-500">
              @{username}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <label className="block text-sm sm:text-base mb-1">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full border-b border-gray-300 pb-2 mb-6 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!amount}
          className="w-full py-3 cursor-pointer rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition disabled:opacity-70"
        >
          Send
        </button>
      </div>
    </div>
  );
};
