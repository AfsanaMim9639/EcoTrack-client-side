// src/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API to send password reset email
    console.log("Reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-forest text-white px-6">
      <div className="max-w-md w-full bg-white/10 p-8 rounded-xl border border-accent text-center">
        <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
        {!submitted ? (
          <>
            <p className="mb-6 text-white/80">
              Enter your email address below and we will send you a password reset link.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 rounded bg-white/10 border border-white/20 text-white"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg"
              >
                Send Reset Link
              </button>
            </form>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 text-accent underline"
            >
              Back to Login
            </button>
          </>
        ) : (
          <div>
            <p className="mb-6 text-white/80">
              A password reset link has been sent to <span className="font-semibold">{email}</span>. Please check your inbox.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
