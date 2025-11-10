import React, { useState } from "react";
import recentTips from "../data/recentTips.json";
import { FaArrowUp, FaUser, FaClock, FaLightbulb } from "react-icons/fa";

const RecentTips = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section 
      className="w-full py-16 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      ></div>
      
      {/* Dark Gradient Overlay for readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(10, 46, 31, 0.92) 0%, rgba(13, 61, 41, 0.95) 100%)"
        }}
      ></div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-leaf/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--leaf))",
                  boxShadow: "0 4px 20px rgba(74, 222, 128, 0.3)"
                }}
              >
                <FaLightbulb className="text-white text-xl" />
              </div>
              Recent Tips & Ideas
            </h2>
            <p className="text-white/70 text-sm md:text-base ml-16">
              Community wisdom for sustainable living
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTips.slice(0, 6).map((tip) => (
            <div
              key={tip.id}
              onMouseEnter={() => setHoveredId(tip.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(34, 197, 94, 0.05))",
                backdropFilter: "blur(10px)",
                border: hoveredId === tip.id 
                  ? "2px solid rgba(74, 222, 128, 0.5)" 
                  : "1px solid rgba(74, 222, 128, 0.2)",
                boxShadow: hoveredId === tip.id
                  ? "0 20px 60px rgba(74, 222, 128, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* Animated Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.1))"
                }}
              ></div>

              {/* Glowing Top Line */}
              <div 
                className="absolute top-0 left-0 w-full h-1 transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg, var(--accent), var(--leaf))",
                  boxShadow: hoveredId === tip.id ? "0 0 15px var(--accent)" : "none"
                }}
              ></div>

              {/* Content Container */}
              <div className="relative z-10 p-6">
                
                {/* Category Badge */}
                <div className="mb-4">
                  <span 
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(74, 222, 128, 0.15)",
                      border: "1px solid var(--accent)",
                      color: "var(--accent)"
                    }}
                  >
                    <FaLightbulb className="text-[10px]" />
                    Eco Tip
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {tip.title}
                </h3>

                {/* Preview Text */}
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {tip.preview}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-4"></div>

                {/* Author & Date Section */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(74, 222, 128, 0.2)"
                      }}
                    >
                      <FaUser className="text-accent text-xs" />
                    </div>
                    <span className="font-medium">{tip.authorName}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-white/50">
                    <FaClock className="text-[10px]" />
                    <span>{new Date(tip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                {/* Upvotes Section */}
                <div className="flex items-center justify-between">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: hoveredId === tip.id 
                        ? "var(--accent)" 
                        : "rgba(74, 222, 128, 0.1)",
                      color: hoveredId === tip.id ? "white" : "var(--accent)",
                      border: hoveredId === tip.id ? "none" : "1px solid var(--accent)"
                    }}
                  >
                    <FaArrowUp className="text-xs" />
                    {tip.upvotes}
                  </button>

                  <span className="text-white/50 text-xs">
                    {tip.upvotes > 100 ? "Popular" : "Trending"}
                  </span>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div 
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: "var(--accent)",
                  filter: "blur(30px)"
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="group px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--leaf))",
              color: "white",
              boxShadow: "0 8px 30px rgba(74, 222, 128, 0.3)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Tips
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
      </div>
    </section>
  );
};

export default RecentTips;