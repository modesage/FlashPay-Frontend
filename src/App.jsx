import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastProvider } from "./components/ToastProvider";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Transactions } from "./pages/Transactions";
import { Profile } from "./pages/Profile";
import { ManageBalance } from "./pages/ManageBalance";
import { LandingPage } from "./pages/LandingPage";
import { DeleteAccount } from "./pages/DeleteAccount";

function App() {
  return (
    <>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/manage-balance" element={<ProtectedRoute><ManageBalance /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
            <Route path="/delete" element={<ProtectedRoute><DeleteAccount /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
}
export default App;
