// src/pages/AddChallengePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddChallengePage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [metric, setMetric] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would normally call API to save challenge
    const newChallenge = { title, category, metric, image };
    console.log("New Challenge:", newChallenge);

    // Navigate back to challenges page after adding
    navigate("/challenges");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forest text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">You must be logged in to add a new challenge.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest text-white py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Add New Challenge</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-6 bg-white/10 p-6 rounded-xl border border-accent"
      >
        <input
          type="text"
          placeholder="Challenge Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20 text-white"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20 text-white"
          required
        />
        <input
          type="text"
          placeholder="Metric / Description"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20 text-white"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-3 rounded bg-white/10 border border-white/20 text-white"
          required
        />

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-accent font-semibold text-lg mx-auto block"
        >
          Add Challenge
        </button>
      </form>
    </div>
  );
};

export default AddChallengePage;
