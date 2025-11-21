import React, { useState, useEffect } from "react";
import { FaArrowUp, FaUser, FaClock, FaLightbulb } from "react-icons/fa";

const RecentTips = () => {
  const [tips, setTips] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tips`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (Array.isArray(data)) setTips(data);
        else throw new Error("Invalid data format received");
      } catch (err) {
        console.error("Error fetching tips:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg text-white mt-12">
        Loading tips...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-lg text-red-400 mt-12">
        Error loading tips: {error}
      </p>
    );

  if (tips.length === 0)
    return (
      <p className="text-center text-lg text-white mt-12">
        No tips found.
      </p>
    );

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
          {tips.slice(0, 6).map((tip) => (
            <div
              key={tip._id}
              onMouseEnter={() => setHoveredId(tip._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(34, 197, 94, 0.05))",
                backdropFilter: "blur(10px)",
                border: hoveredId === tip._id 
                  ? "2px solid rgba(74, 222, 128, 0.5)" 
                  : "1px solid rgba(74, 222, 128, 0.2)",
                boxShadow: hoveredId === tip._id
                  ? "0 20px 60px rgba(74, 222, 128, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* Content */}
              <div className="relative z-10 p-6">
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
                    {tip.category || "Tip"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {tip.title}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {tip.content}
                </p>

                <div className="flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(74, 222, 128, 0.2)" }}
                    >
                      <FaUser className="text-accent text-xs" />
                    </div>
                    <span className="font-medium">{tip.authorName}</span>
                  </div>

                  <div className="flex items-center gap-1 text-white/50">
                    <FaClock className="text-[10px]" />
                    <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: hoveredId === tip._id 
                        ? "var(--accent)" 
                        : "rgba(74, 222, 128, 0.1)",
                      color: hoveredId === tip._id ? "white" : "var(--accent)",
                      border: hoveredId === tip._id ? "none" : "1px solid var(--accent)"
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="group px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--leaf))",
              color: "white",
              boxShadow: "0 8px 30px rgba(74, 222, 128, 0.3)",
            }}
          >
            View All Tips
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentTips;
