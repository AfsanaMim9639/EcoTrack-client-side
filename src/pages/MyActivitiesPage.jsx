// src/pages/MyActivitiesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import activeChallengesData from "../data/activeChallenges.json";

const db = getFirestore();

const MyActivitiesPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener for user progress
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const progressRef = collection(db, `users/${user.uid}/progress`);

    const unsubscribe = onSnapshot(progressRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        challengeId: Number(doc.id),
        ...doc.data(),
      }));
      setUserProgress(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Create a map for fast challenge lookup
  const challengesMap = new Map(activeChallengesData.map((c) => [c.id, c]));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forest text-white">
        <p>Loading your activities...</p>
      </div>
    );
  }

  if (!user) {
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
        {userProgress.length === 0 ? (
          <p className="text-center text-white/70">
            You haven’t joined any challenges yet.
          </p>
        ) : (
          userProgress.map((item) => {
            const challenge = challengesMap.get(item.challengeId);
            if (!challenge) return null;

            return (
              <div
                key={item.challengeId}
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
                  <p className="text-white/80 text-sm mt-1">
                    {item.progress}% completed
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/challenges/join/${challenge.id}`)}
                  className="px-4 py-2 rounded-xl bg-accent font-semibold text-sm"
                >
                  Update Progress
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyActivitiesPage;
