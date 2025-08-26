import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/transactions", label: "Transactions" },
    { path: "/manage-balance", label: "Manage Balance" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4 relative z-50">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-gray-800">
        {location.pathname === "/dashboard" && "Dashboard"}
        {location.pathname === "/transactions" && "Transaction History"}
        {location.pathname === "/manage-balance" && "Manage Balance"}
        {location.pathname === "/profile" && "Profile"}
      </h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-3 items-center">
        {navItems
          .filter((item) => item.path !== location.pathname)
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-4 py-2 rounded-lg text-gray-800 font-medium hover:bg-gray-100 transition"
            >
              {item.label}
            </Link>
          ))}
        <button
          onClick={handleSignout}
          className="px-4 py-2 rounded-lg cursor-pointer bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <HiX size={28} />
          </button>
        </div>
        <div className="flex flex-col items-start px-6 space-y-4 mt-4">
          {navItems
            .filter((item) => item.path !== location.pathname)
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-2 py-2 w-full text-gray-700 hover:text-indigo-600 font-medium transition text-left"
              >
                {item.label}
              </Link>
            ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleSignout();
            }}
            className="px-4 py-2 w-full text-white bg-red-500 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};
