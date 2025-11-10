// src/pages/ChallengesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import ActiveChallenges from "../components/ActiveChallenges";

const ChallengesPage = () => {
  const navigate = useNavigate(); // <-- initialize navigate

  return (
    <div className="min-h-screen bg-forest text-white py-12">
      <h1 className="text-4xl font-bold text-center mb-12 mt-10">All Challenges</h1>
      
      {/* Show all challenges */}
      <ActiveChallenges showAll={true} />

      {/* Back to Home Button */}
      <div className="text-center mt-16">
        <button
          onClick={() => navigate("/")} // <-- navigate to home
          className="px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--leaf))",
            color: "white",
            boxShadow: "0 8px 30px rgba(74, 222, 128, 0.3)",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ChallengesPage;
