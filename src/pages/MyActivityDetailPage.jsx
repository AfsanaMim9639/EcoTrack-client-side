// src/pages/MyActivityDetailPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import activeChallengesData from "../data/activeChallenges.json";

const MyActivityDetailPage = ({ isLoggedIn, userProgressData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forest text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">You must be logged in to view this activity.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block"
        >
          Login
        </button>
      </div>
    );
  }

  const challenge = activeChallengesData.find(c => c.id.toString() === id);
  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forest text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Challenge not found</h1>
        <button
          onClick={() => navigate("/my-activities")}
          className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block"
        >
          Back to My Activities
        </button>
      </div>
    );
  }

  // Get user progress for this challenge (dummy data or from API)
  const initialProgress =
    userProgressData?.find((p) => p.id.toString() === id)?.progress || 0;

  const [progress, setProgress] = useState(initialProgress);

  const handleProgressChange = (e) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setProgress(value);
    // TODO: send API to save user progress
  };

  return (
    <div className="min-h-screen bg-forest text-white py-12 px-6 md:px-12">
      <button
        onClick={() => navigate("/my-activities")}
        className="mb-8 px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block"
      >
        Back to My Activities
      </button>

      <div className="max-w-2xl mx-auto flex flex-col gap-6 bg-white/10 p-6 rounded-xl border border-accent">
        <h1 className="text-4xl font-bold">{challenge.title}</h1>
        <p className="text-accent font-semibold">{challenge.category}</p>
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full rounded-2xl mb-4"
        />
        <p className="text-white/80 mb-4">{challenge.metric}</p>

        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Your Progress: {progress}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={handleProgressChange}
            className="w-full accent-accent"
          />
        </div>

        <button
          onClick={() => alert(`Progress for "${challenge.title}" saved!`)}
          className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block mt-4"
        >
          Save Progress
        </button>
      </div>
    </div>
  );
};

export default MyActivityDetailPage;
