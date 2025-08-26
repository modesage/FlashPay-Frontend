import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import BrandLogo from "../../assets/icon/brand.svg";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 sm:px-8 py-4 bg-white shadow-sm relative z-50">
        <div className="flex items-center space-x-3">
          <img src={BrandLogo} alt="FlashPay Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-indigo-600">FlashPay</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/signin"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 w-56 sm:w-48 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            <HiX size={28} />
          </button>
        </div>
        <div className="flex flex-col items-start px-6 space-y-4 mt-4">
          <Link
            to="/signin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-2 pt-2 text-gray-700 hover:text-indigo-600 font-medium transition w-full"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-2 pb-2 text-gray-700 hover:text-indigo-600 font-medium transition w-full"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold pt-4 pb-2 text-gray-900 mb-4">
          Fast. Secure. <span className="text-indigo-600">Payments.</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          FlashPay lets you send and receive money instantly with industry-grade
          security. Simple, reliable, and lightning fast.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 cursor-pointer rounded-xl bg-indigo-600 text-white text-lg font-medium shadow-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </button>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-indigo-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Transfer money instantly without delays. Speed is our priority.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-indigo-600 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Bank-Level Security</h3>
            <p className="text-gray-600">
              Every transaction is encrypted and protected with the latest
              security standards.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-indigo-600 text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Simple & Modern</h3>
            <p className="text-gray-600">
              No clutter, no complexity. Just a clean experience to manage your
              money.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        © {new Date().getFullYear()} FlashPay. All rights reserved.
      </footer>
    </div>
  );
};
