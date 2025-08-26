import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useToast } from "../components/ToastProvider";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { push } = useToast();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignup = async () => {
    if (!firstName || !lastName || !username || !password) {
      push("All fields are required", "error");
      return;
    }

    setLoading(true);
    try {
      await api.post("/user/signup", {
        username,
        password,
        firstName,
        lastName,
      });

      push("Account created successfully! Please sign in.", "success");
      navigate("/signin");
    } catch (err) {
      push(
        err?.response?.data?.message || "Signup failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />

        <div className="space-y-4 mt-6">
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label="First Name"
            type="text"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Snow"
            label="Last Name"
            type="text"
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="realjohnsnow"
            label="Username"
            type="text"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            label="Password"
          />
        </div>

        <div className="pt-6">
          <Button
            onClick={handleSignup}
            label={loading ? "Signing up..." : "Sign up"}
            customClass="w-full"
            disabled={loading}
          />
        </div>

        <div className="pt-4 text-center">
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};
