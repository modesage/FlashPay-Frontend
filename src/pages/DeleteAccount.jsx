import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useToast } from "../components/ToastProvider";
import { Header } from "../components/Header";

export const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleDelete = async () => {
    if (!password) {
      toast.push("Password is required", "error");
      return;
    }

    if (!window.confirm("Are you sure? This action is permanent.")) return;

    try {
      setLoading(true);
      await api.delete("/user/delete", { data: { password } });
      localStorage.removeItem("token");
      toast.push("Your account has been deleted", "success");
      navigate("/signup");
    } catch (err) {
      toast.push(
        err?.response?.data?.message || "Account deletion failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-md mx-auto p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Delete Account
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Once you delete your account, all your profile information will be
            permanently removed. Your past transactions will remain but will
            show as "Deleted Account".
          </p>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 py-2 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-70"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
