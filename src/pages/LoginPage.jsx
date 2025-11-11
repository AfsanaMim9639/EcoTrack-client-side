import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Protected route redirect info
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake login logic (replace with real API call)
    setTimeout(() => {
      setLoading(false);
      if (email === "user@example.com" && password === "123456") {
        toast.success("Login successful!");
        navigate(from, { replace: true }); // 🔹 redirect to intended route
      } else {
        toast.error("Invalid email or password");
      }
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast("Google login clicked!", { icon: "⚡" });
    // Integrate Google OAuth here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Login to EcoTrack</h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          {/* Login button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl bg-accent text-forest font-semibold hover:bg-accent/90 transition flex justify-center items-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-3 rounded-xl bg-white/20 text-white flex justify-center items-center gap-2 hover:bg-white/30 transition"
        >
          <FaGoogle /> Login with Google
        </button>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <p
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </p>
          <p
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
