import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { Button } from "./Button";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const debounced = useDebounce(filter, 300);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(
          "/user/bulk?filter=" + encodeURIComponent(debounced)
        );
        setUsers(res.data.user ?? []);
        setPage(1);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      }
    })();
  }, [debounced]);

  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil((users?.length || 0) / pageSize));
  const visible = useMemo(() => {
    const start = (page - 1) * pageSize;
    return (users ?? []).slice(start, start + pageSize);
  }, [users, page]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl font-semibold text-gray-800 text-center sm:text-left">
          All Users
        </h2>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <button
            className="px-3 py-1.5 cursor-pointer rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} / {pageCount}
          </span>
          <button
            className="px-3 py-1.5 cursor-pointer rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
          >
            Next
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customBlack focus:border-customBlack"
        />
      </div>

      {/* User list */}
      <div className="space-y-4">
        {visible.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg p-4 gap-4 sm:gap-0">
      {/* Avatar + Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center rounded-full bg-customBlack text-white h-12 w-12">
            <span className="text-lg font-bold">
              {user.firstName?.[0] || "U"}
            </span>
          </div>
        </div>
        <div>
          <div className="text-gray-800 font-semibold text-sm sm:text-base">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-gray-500 text-xs sm:text-sm">
            {user.username}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full sm:w-auto mt-2 sm:mt-0">
        <Button
          onClick={() =>
            navigate(
              `/send?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}&username=${user.username}`
            )
          }
          label="Send Money"
          customClass="w-full sm:w-auto px-5 py-2"
        />
      </div>
    </div>
  );
}

// Debounce hook for search input
function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}
