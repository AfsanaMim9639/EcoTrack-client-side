import React, { useState, useEffect } from "react";

const statsData = [
  { id: 1, title: "CO₂ Saved", value: 12540, unit: "kg" },
  { id: 2, title: "Plastic Reduced", value: 8320, unit: "kg" },
  { id: 3, title: "Trees Planted", value: 1200, unit: "" },
  { id: 4, title: "Community Members", value: 450, unit: "" },
];

const LiveStatistics = () => {
  const [stats, setStats] = useState(statsData);

  // Optional: animate numbers increasing
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
    <section className="w-full py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl py-6 px-4 shadow-lg flex flex-col items-center justify-center transition hover:scale-105"
            style={{
              backgroundColor: "var(--accent)", // solid theme color
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-1 text-white">{stat.value.toLocaleString()}</h3>
            <p className="text-sm md:text-base text-white opacity-90">{stat.title}</p>
            {stat.unit && <span className="text-xs md:text-sm text-white opacity-80">{stat.unit}</span>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveStatistics;
