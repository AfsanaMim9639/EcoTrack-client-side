import React, { useState } from "react";
import activeChallengesData from "../data/activeChallenges.json";

const ActiveChallenges = ({ showAll = false }) => {
  const [isExpanded, setIsExpanded] = useState(showAll);
  
  // Show only 6 cards initially on home page
  const displayedChallenges = isExpanded 
    ? activeChallengesData 
    : activeChallengesData.slice(0, 6);

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-forest text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-accent text-center">
          Active Challenges
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {displayedChallenges.map((challenge) => {
            return (
              <div
                key={challenge.id}
                className="flex items-center justify-center"
              >
                {/* Container for Image + Info Card */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    {/* Square Image with overlay */}
                    <div
                      className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 z-10"
                      style={{
                        backgroundImage: `url(${challenge.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Dark overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    {/* Info Card - 50% Overlapping with high contrast */}
                    <div
                      className="absolute right-28 md:right-32 w-40 md:w-48 p-3 md:p-4 rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 z-20"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(10, 46, 31, 0.95), rgba(16, 43, 30, 0.95))",
                        backdropFilter: "blur(12px)",
                        border: "2px solid rgba(74, 222, 128, 0.5)",
                        boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--accent), var(--leaf))",
                        }}
                      ></div>

                      {/* Content */}
                      <div className="text-left">
                        <h3 className="text-base md:text-lg font-bold text-white mb-1">
                          {challenge.title}
                        </h3>
                        <p className="text-accent font-semibold text-xs mb-2">
                          {challenge.category}
                        </p>
                        <p className="text-white/80 text-xs leading-relaxed mb-2">
                          {challenge.metric}
                        </p>

                        {/* CTA Button */}
                        <button
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

                      {/* Decorative accent blob */}
                      <div
                        className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10"
                        style={{
                          background: "var(--accent)",
                          filter: "blur(20px)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {!showAll && !isExpanded && activeChallengesData.length > 6 && (
          <div className="text-center mt-16">
            <button
              onClick={() => setIsExpanded(true)}
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
              
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        )}

        {/* Show Less Button (when expanded) */}
        {isExpanded && !showAll && (
          <div className="text-center mt-16">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(74, 222, 128, 0.1)",
                border: "2px solid var(--accent)",
                color: "var(--accent)",
              }}
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActiveChallenges;