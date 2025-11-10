// src/pages/MyActivitiesPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import activeChallengesData from "../data/activeChallenges.json";

const MyActivitiesPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Dummy user progress (normally from API)
  const [userProgress, setUserProgress] = useState([
    { id: 1, progress: 60 },
    { id: 2, progress: 25 },
    { id: 3, progress: 90 },
  ]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forest text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">You must be logged in to view your activities.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest text-white py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold mb-8 text-center mt-20">My Activities</h1>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {userProgress.map((item) => {
          const challenge = activeChallengesData.find(c => c.id === item.id);
          if (!challenge) return null;

          return (
            <div
              key={item.id}
              className="bg-white/10 p-4 rounded-xl border border-accent flex flex-col md:flex-row items-center gap-4"
            >
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{challenge.title}</h2>
                <p className="text-accent font-semibold">{challenge.category}</p>

                {/* Progress Bar */}
                <div className="mt-2 w-full bg-white/20 h-4 rounded-lg">
                  <div
                    className="h-4 rounded-lg bg-accent"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-white/80 text-sm mt-1">{item.progress}% completed</p>
              </div>

              <button
                onClick={() => navigate(`/challenges/join/${challenge.id}`)}
                className="px-4 py-2 rounded-xl bg-accent font-semibold text-sm"
              >
                Update Progress
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyActivitiesPage;
