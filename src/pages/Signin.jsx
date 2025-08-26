import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useToast } from "../components/ToastProvider";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { push } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignin = async () => {
    if (!username || !password) {
      push("Username and password are required", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/user/signin", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      push("Signed in successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      push(
        err?.response?.data?.message || "Invalid username or password",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        {/* Heading */}
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />

        {/* Input Fields */}
        <div className="space-y-4 mt-6">
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="realjohnsnow"
            label="Username"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            label="Password"
          />
        </div>

        {/* Button */}
        <div className="pt-6 text-center">
          <Button
            onClick={handleSignin}
            label={loading ? "Signing in..." : "Sign in"}
            customClass="w-full"
            disabled={loading}
          />
        </div>

        {/* Bottom Link */}
        <div className="pt-4">
          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};
