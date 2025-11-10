import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pw) => {
    const uppercase = /[A-Z]/.test(pw);
    const lowercase = /[a-z]/.test(pw);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
    const minLength = pw.length >= 6;

    if (!uppercase) return "Password must have at least 1 uppercase letter";
    if (!lowercase) return "Password must have at least 1 lowercase letter";
    if (!special) return "Password must have at least 1 special character";
    if (!minLength) return "Password must be at least 6 characters";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);

    // Fake registration logic (replace with real API)
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        toast.success("Registration successful!");
        navigate("/"); // redirect to Home
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }, 1500);
  };

  const handleGoogleRegister = () => {
    toast("Google register clicked!", { icon: "⚡" });
    // Integrate Google OAuth here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Join EcoTrack</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
            {passwordError && (
              <p className="text-red-400 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl bg-accent text-forest font-semibold hover:bg-accent/90 transition flex justify-center items-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 py-3 rounded-xl bg-white/20 text-white flex justify-center items-center gap-2 hover:bg-white/30 transition"
        >
          <FaGoogle /> Register with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
