import React, { useState, useEffect } from "react";

const statsData = [
  { id: 1, title: "CO₂ Saved", value: 12540, unit: "kg", icon: "🌍" },
  { id: 2, title: "Plastic Reduced", value: 8320, unit: "kg", icon: "♻️" },
  { id: 3, title: "Trees Planted", value: 1200, unit: "", icon: "🌳" },
  { id: 4, title: "Community Members", value: 450, unit: "", icon: "👥" },
];

const LiveStatistics = () => {
  const [stats, setStats] = useState(statsData);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 5),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="w-full py-16 px-6 md:px-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A2E1F 0%, #0d3d29 100%)"
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-leaf/5 rounded-full blur-3xl"></div>

      {/* Section Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Our Impact in Real-Time
        </h2>
        <p className="text-white/70 text-sm md:text-base">
          Join thousands making a difference every day
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(74, 222, 128, 0.2)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)"
            }}
          >
            {/* Animated gradient overlay on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.1))"
              }}
            ></div>

            {/* Glowing accent line */}
            <div 
              className="absolute top-0 left-0 w-full h-1 transition-all duration-300"
              style={{
                background: "linear-gradient(90deg, var(--accent), var(--leaf))",
                boxShadow: "0 0 10px var(--accent)"
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-1 mb-2">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value.toLocaleString()}
                </h3>
                {stat.unit && (
                  <span className="text-lg text-accent font-semibold">
                    {stat.unit}
                  </span>
                )}
              </div>

              {/* Title */}
              <p className="text-sm md:text-base text-white/80 font-medium">
                {stat.title}
              </p>

              {/* Live indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-xs text-accent/80 uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div 
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10"
              style={{
                background: "var(--accent)",
                filter: "blur(20px)"
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Bottom decorative text */}
      <div className="text-center mt-12 relative z-10">
        <p className="text-white/50 text-sm">
          Stats update every 3 seconds • Growing stronger together 🌱
        </p>
      </div>
    </section>
  );
};

export default LiveStatistics;