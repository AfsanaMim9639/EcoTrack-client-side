import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import activeChallengesData from "../data/activeChallenges.json";

const ActiveChallenges = ({ showAll = false, pageTitle, isLoggedIn }) => {
  const [isExpanded, setIsExpanded] = useState(showAll);
  const navigate = useNavigate();

  const displayedChallenges = isExpanded
    ? activeChallengesData
    : activeChallengesData.slice(0, 6);

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-forest text-white">
      <div className="max-w-7xl mx-auto">

        {pageTitle && (
          <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-accent text-center`}>
            {pageTitle}
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {displayedChallenges.map((challenge) => (
            <div key={challenge.id} className="flex items-center justify-center">
              {/* Card wrapper */}
              <div className="relative">
                <div className="flex items-center justify-center">

                  {/* Challenge Image (clickable for details) */}
                  <div
                    className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 z-10 cursor-pointer"
                    style={{
                      backgroundImage: `url(${challenge.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => navigate(`/challenges/${challenge.id}`)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>

                  {/* Info Card */}
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
                      style={{ background: "linear-gradient(90deg, var(--accent), var(--leaf))" }}
                    ></div>
                    <div className="text-left">
                      <h3 className="text-base md:text-lg font-bold text-white mb-1">{challenge.title}</h3>
                      <p className="text-accent font-semibold text-xs mb-2">{challenge.category}</p>
                      <p className="text-white/80 text-xs leading-relaxed mb-2">{challenge.metric}</p>

                      {/* Join Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          if (isLoggedIn) {
                            navigate(`/challenges/join/${challenge.id}`);
                          } else {
                            navigate("/login");
                          }
                        }}
                        className="w-full px-3 py-1 rounded-lg font-medium text-xs transition-all duration-300 hover:scale-105"
                        style={{
                          background: "var(--accent)",
                          color: "white",
                          boxShadow: "0 4px 15px rgba(74, 222, 128, 0.3)",
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-16">
            <button
              onClick={() => navigate("/challenges")}
              className="group px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--leaf))",
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
