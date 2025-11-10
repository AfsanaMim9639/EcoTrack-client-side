// src/pages/ChallengeDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import activeChallengesData from "../data/activeChallenges.json";

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const challenge = activeChallengesData.find(c => c.id.toString() === id);

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forest text-white text-center">
  <h1 className="text-3xl font-bold mb-4">Challenge not found</h1>
  <button
    onClick={() => navigate("/challenges")}
    className="px-6 py-2 rounded-xl bg-accent font-semibold"
  >
    Back to Challenges
  </button>
</div>

    );
  }

  return (
    <div className="min-h-screen bg-forest text-white py-12 px-6 md:px-12 mt-20 ">
     <button
  onClick={() => navigate("/challenges")}
  className="mb-8 px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block"
>
  Back to Challenges
</button>


      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{challenge.title}</h1>
        <p className="text-accent font-semibold mb-2">{challenge.category}</p>
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full rounded-2xl mb-4"
        />
        <p className="text-white/80">{challenge.metric}</p>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
