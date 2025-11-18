import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const AddChallengePage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [metric, setMetric] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Get logged-in Firebase user's email
  useEffect(() => {
    if (isLoggedIn) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) setUserEmail(user.email);
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select start and end dates!");
      return;
    }

    const newChallenge = {
      title,
      category,
      impactMetric: metric,
      imageUrl: image,
      participants: 0,
      createdBy: userEmail || "admin@ecotrack.com",
      startDate,
      endDate,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/challenges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChallenge),
      });

      if (!res.ok) throw new Error("Failed to add challenge");

      const data = await res.json();
      console.log("Challenge added:", data);
      navigate("/challenges");
    } catch (err) {
      console.error("Error adding challenge:", err);
      alert("Failed to add challenge. Check console for details.");
    }
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
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 rounded bg-white/10 border border-white/20 text-white w-full"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 rounded bg-white/10 border border-white/20 text-white w-full"
              required
            />
          </div>
        </div>

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
