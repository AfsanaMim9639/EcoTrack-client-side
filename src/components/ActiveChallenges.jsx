import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActiveChallenges = ({ 
  showAll = false, 
  pageTitle, 
  isLoggedIn, 
  user,
  challenges: propChallenges 
}) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ একটা useEffect এই সব handle করবে
  useEffect(() => {
    // যদি props থেকে challenges আসে
    if (propChallenges && Array.isArray(propChallenges)) {
      setChallenges(propChallenges);
      setLoading(false);
      return;
    }

    // নাহলে backend থেকে fetch করো
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Fetching from:", `${import.meta.env.VITE_API_URL}/api/challenges`);
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/challenges`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ Fetched Challenges:", data);

        // Handle different response formats
        let challengeData = [];
        if (data.success && Array.isArray(data.data)) {
          challengeData = data.data;
        } else if (Array.isArray(data)) {
          challengeData = data;
        } else if (data.challenges && Array.isArray(data.challenges)) {
          challengeData = data.challenges;
        } else {
          throw new Error("Invalid data format received");
        }

        setChallenges(challengeData);
      } catch (err) {
        console.error("❌ Error fetching challenges:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [propChallenges]); // ✅ শুধু propChallenges dependency

  // Display logic
  const displayedChallenges = showAll ? challenges : challenges.slice(0, 6);

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-16 px-6 bg-forest">
        <p className="text-center text-lg text-white">Loading challenges...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full py-16 px-6 bg-forest">
        <p className="text-center text-lg text-red-400">
          Error loading challenges: {error}
        </p>
      </div>
    );
  }

  // Empty state
  if (!challenges.length) {
    return (
      <div className="w-full py-16 px-6 bg-forest">
        <p className="text-center text-lg text-white">No challenges found.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-forest text-white">
      <div className="max-w-7xl mx-auto">
        {pageTitle && (
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-accent text-center">
            {pageTitle}
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {displayedChallenges.map((challenge) => {
            const challengeId = challenge._id || challenge.id || `challenge-${Math.random().toString(36).substr(2, 9)}`;

            return (
              <div key={challengeId} className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex items-center justify-center">
                    {/* Challenge Image */}
                    <div
                      className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 z-10 cursor-pointer"
                      style={{
                        backgroundImage: `url(${challenge.imageUrl || "/placeholder.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() => navigate(`/challenges/${challengeId}`)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    {/* Challenge Info Card */}
                    <div
                      className="absolute right-28 md:right-32 w-40 md:w-48 p-3 md:p-4 rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 z-20"
                      style={{
                        background: "linear-gradient(135deg, rgba(10, 46, 31, 0.95), rgba(16, 43, 30, 0.95))",
                        backdropFilter: "blur(12px)",
                        border: "2px solid rgba(74, 222, 128, 0.5)",
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{
                          background: "linear-gradient(90deg, #4ade80, #22c55e)",
                        }}
                      ></div>
                      
                      <div className="text-left">
                        <h3 className="text-base md:text-lg font-bold text-white mb-1">
                          {challenge.title}
                        </h3>
                        <p className="text-accent font-semibold text-xs mb-2">
                          {challenge.category}
                        </p>
                        <p className="text-white/80 text-xs leading-relaxed mb-2">
                          {challenge.impactMetric}
                        </p>

                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            
                            if (!isLoggedIn || !user?.email) {
                              alert("Please login to join a challenge!");
                              return;
                            }

                            try {
                              const res = await fetch(
                                `${import.meta.env.VITE_API_URL}/api/challenges/join/${challengeId}`,
                                {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ userId: user.email }),
                                }
                              );

                              if (!res.ok) {
                                const errorData = await res.json();
                                throw new Error(errorData.message || "Failed to join challenge");
                              }

                              const data = await res.json();
                              console.log("✅ Joined challenge:", data);
                              alert("You successfully joined the challenge!");
                            } catch (err) {
                              console.error("❌ Join error:", err);
                              alert(`Error: ${err.message}`);
                            }
                          }}
                          className="w-full px-3 py-1 rounded-lg font-medium text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{
                            background: "#4ade80",
                            color: "white",
                            boxShadow: "0 4px 15px rgba(74, 222, 128, 0.3)",
                          }}
                        >
                          Join Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {!showAll && challenges.length > 6 && (
          <div className="text-center mt-16">
            <button
              onClick={() => navigate("/challenges")}
              className="group px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                color: "white",
                boxShadow: "0 8px 30px rgba(74, 222, 128, 0.3)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                See More Challenges
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActiveChallenges;