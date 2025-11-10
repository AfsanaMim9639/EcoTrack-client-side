// src/pages/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-forest text-white px-6">
      <div className="text-center relative">
        {/* Animated "404" */}
        <h1 className="text-[10rem] md:text-[12rem] font-extrabold animate-bounce-slow">
          404
        </h1>

        {/* Ghost icon or animated element */}
        <div className="absolute inset-x-0 top-40 flex justify-center">
          <div className="w-32 h-32 bg-accent rounded-full animate-pulse opacity-50"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12">Page Not Found</h2>
        <p className="text-white/70 mt-2 mb-6">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Back Home Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg hover:scale-105 transition-transform"
        >
          Back to Home
        </button>
      </div>

      {/* Floating leaf / particle animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-leaf rounded-full absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
