import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Header } from "../components/Header";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState("");
  const limit = 5;

  useEffect(() => {
    getUserId();
    fetchBalance();
    fetchTransactions(page);
  }, [page]);

  const getUserId = async () => {
    try {
      const res = await api.get("/user/me");
      setUserId(res.data.user._id);
    } catch (err) {
      console.error("Error fetching userId:", err);
    }
  }

  const fetchBalance = async () => {
    try {
      const res = await api.get("/account/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const fetchTransactions = async (page) => {
    try {
      const res = await api.get(`/account/transactions?page=${page}&limit=${limit}`);
      setTransactions(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
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

        {/* Transactions Table */}
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left">Date</th>
                <th className="px-4 sm:px-6 py-3 text-left">Type</th>
                <th className="px-4 sm:px-6 py-3 text-left">From</th>
                <th className="px-4 sm:px-6 py-3 text-left">To</th>
                <th className="px-4 sm:px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.length > 0 ? transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 text-gray-700">{new Date(tx.createdAt).toLocaleDateString()} <span className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleTimeString()}</span></td>
                  <td className="px-4 sm:px-6 py-3 capitalize font-medium text-gray-700">{tx.type}</td>
                  <td className="px-4 sm:px-6 py-3 text-gray-700">{tx.from ? <><span className="font-medium">{tx.from.firstName} {tx.from.lastName}</span><div className="text-xs text-gray-500">@{tx.from.username}</div></> : "-"}</td>
                  <td className="px-4 sm:px-6 py-3 text-gray-700">{tx.to ? <><span className="font-medium">{tx.to.firstName} {tx.to.lastName}</span><div className="text-xs text-gray-500">@{tx.to.username}</div></> : "-"}</td>
                  <td className={`px-4 sm:px-6 py-3 text-right font-semibold ${
                    (tx.type === "withdraw" || (tx.type === "transfer" && tx.from?._id === userId))
                      ? "text-red-600" 
                      : "text-green-600"
                  }`}>
                    {tx.type === "withdraw" || (tx.type === "transfer" && tx.from?._id === userId)
                      ? `- ₹${tx.amount.toLocaleString()}`
                      : `+ ₹${tx.amount.toLocaleString()}`}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-4 sm:px-6 py-6 text-center text-gray-500">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
