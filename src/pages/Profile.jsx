import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useToast } from "../components/ToastProvider";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
  });
  const [username, setUsername] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/me");
        const { firstName, lastName, username } = res.data.user || {};
        setForm((f) => ({
          ...f,
          firstName: firstName || "",
          lastName: lastName || "",
        }));
        setUsername(username || "");
      } catch {
        // silent fail
      }
    })();
  }, []);

  const onSave = async () => {
    try {
      const payload = { firstName: form.firstName, lastName: form.lastName };

      if (form.newPassword) {
        if (!form.currentPassword) {
          toast.push("Please enter your current password", "error");
          return;
        }
        payload.oldPassword = form.currentPassword;
        payload.password = form.newPassword;
      }

      await api.put("/user", payload);

      setForm((f) => ({
        ...f,
        currentPassword: "",
        newPassword: "",
      }));

      toast.push("Profile updated successfully", "success");
    } catch (e) {
      toast.push(e?.response?.data?.message || "Update failed", "error");
    }
  };

  const onDelete = async () => {
    if (!deletePassword) {
      toast.push("Please enter your password to confirm deletion", "error");
      return;
    }
    try {
      await api.delete("/user/delete", { data: { password: deletePassword } });
      localStorage.removeItem("token");
      toast.push("Account deleted successfully", "success");
      navigate("/signup");
    } catch (e) {
      toast.push(
        e?.response?.data?.message || "Account deletion failed",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-800">
              {form.firstName} {form.lastName}
            </h2>
            <p className="text-gray-600">@{username || "—"}</p>
          </div>
          <button
            onClick={() => setShowDeleteBox(true)}
            className="w-full sm:w-auto px-5 py-2 cursor-pointer rounded-lg font-medium transition bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Account
          </button>
        </div>

        {/* Profile Settings */}
        {!showDeleteBox && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Profile Settings
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Update your personal information and password below.
            </p>

            <div className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  placeholder="Enter first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  placeholder="Enter last name"
                />
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password (required if changing password)
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={form.currentPassword}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, currentPassword: e.target.value }))
                  }
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, newPassword: e.target.value }))
                  }
                  placeholder="Enter new password"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onSave}
                className="px-6 py-2 cursor-pointer rounded-lg bg-customGrey hover:bg-customBlack text-white font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteBox && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Confirm Account Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your password to confirm account deletion. This action is{" "}
              <span className="font-semibold text-red-600">irreversible</span>.
            </p>

            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Enter password"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onDelete}
                className="flex-1 px-6 py-2 cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setShowDeleteBox(false)}
                className="flex-1 px-6 py-2 cursor-pointer rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
