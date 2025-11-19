import React, { useState, useEffect } from "react";

const LiveStatistics = () => {
  const [stats, setStats] = useState(null); // change to object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/challenges/stats/summary`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setStats(data.data); // stats now is an object
        } else {
          console.error("Failed to fetch stats:", data.message);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-white">Loading stats...</p>;
  if (!stats) return <p className="text-white">No stats found</p>;

  // Convert object to array for mapping
  const statsArray = [
    { title: "Total Challenges", value: stats.totalChallenges, icon: "🏆" },
    { title: "Active Challenges", value: stats.activeChallenges, icon: "🔥" },
    { title: "Categories", value: stats.categories, icon: "📁" },
    { title: "Total Participants", value: stats.totalParticipants, icon: "👥" },
  ];

  return (
    <section
      className="w-full py-16 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A2E1F 0%, #0d3d29 100%)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {statsArray.map((stat, index) => (
          <div
            key={index}
            className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(74, 222, 128, 0.2)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.value.toLocaleString()}</h3>
              </div>
              <p className="text-sm md:text-base text-white/80 font-medium">{stat.title}</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-xs text-accent/80 uppercase tracking-wider">Live</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveStatistics;
