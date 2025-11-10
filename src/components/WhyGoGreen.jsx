import React, { useEffect, useRef, useState } from "react";
import { FaLeaf, FaBolt, FaWater, FaHeartbeat, FaMoneyBillWave, FaHandHoldingHeart, FaSeedling } from "react-icons/fa";

const benefits = [
  { 
    icon: <FaLeaf size={32} />, 
    text: "Reduce carbon footprint",
    color: "#4ade80",
    gradient: "from-green-400 to-emerald-500"
  },
  { 
    icon: <FaBolt size={32} />, 
    text: "Save energy and resources",
    color: "#fbbf24",
    gradient: "from-yellow-400 to-orange-500"
  },
  { 
    icon: <FaWater size={32} />, 
    text: "Protect natural ecosystems",
    color: "#60a5fa",
    gradient: "from-blue-400 to-cyan-500"
  },
  { 
    icon: <FaHeartbeat size={32} />, 
    text: "Improve health and well-being",
    color: "#f87171",
    gradient: "from-red-400 to-pink-500"
  },
  { 
    icon: <FaMoneyBillWave size={32} />, 
    text: "Save money in the long run",
    color: "#34d399",
    gradient: "from-emerald-400 to-teal-500"
  },
  { 
    icon: <FaHandHoldingHeart size={32} />, 
    text: "Support ethical consumption",
    color: "#c084fc",
    gradient: "from-purple-400 to-pink-500"
  },
];

const WhyGoGreen = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const floatingIconsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating animation for icons
  useEffect(() => {
    const animate = () => {
      floatingIconsRef.current.forEach((icon, index) => {
        if (icon) {
          const time = Date.now() * 0.001;
          const offset = index * 0.5;
          icon.style.transform = `translateY(${Math.sin(time + offset) * 10}px)`;
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-6 md:px-12 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0A2E1F 0%, #0d3d29 50%, #0A2E1F 100%)"
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Floating Leaf Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 30}px`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <FaSeedling />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center justify-center mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                boxShadow: "0 10px 40px rgba(74, 222, 128, 0.4)"
              }}
            >
              <FaLeaf className="text-white text-3xl" />
              <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)" }}></div>
            </div>
          </div>

          <h2 
            className={`text-4xl md:text-6xl font-bold mb-4 text-white transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            Why Go <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Green</span>?
          </h2>
          
          <p 
            className={`text-lg md:text-xl text-white/70 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            Living sustainably creates a ripple effect of positive change for you, your community, and our planet. 
            Discover the transformative benefits of an eco-conscious lifestyle.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (floatingIconsRef.current[idx] = el)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative rounded-2xl p-6 cursor-pointer transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${idx * 100 + 600}ms`,
                transform: hoveredIndex === idx ? "translateY(-10px) scale(1.05)" : "",
                background: hoveredIndex === idx 
                  ? "linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.15))"
                  : "linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05))",
                backdropFilter: "blur(10px)",
                border: hoveredIndex === idx ? "2px solid rgba(74, 222, 128, 0.5)" : "1px solid rgba(74, 222, 128, 0.2)",
                boxShadow: hoveredIndex === idx 
                  ? `0 20px 60px ${item.color}40` 
                  : "0 8px 32px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* Animated gradient overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`
                }}
              ></div>

              {/* Glowing top line */}
              <div 
                className="absolute top-0 left-0 w-full h-1 rounded-t-2xl transition-all duration-300"
                style={{
                  background: hoveredIndex === idx ? `linear-gradient(90deg, ${item.color}, transparent)` : "transparent",
                  boxShadow: hoveredIndex === idx ? `0 0 20px ${item.color}` : "none"
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-500"
                  style={{
                    background: hoveredIndex === idx 
                      ? `linear-gradient(135deg, ${item.color}, ${item.color}CC)`
                      : `${item.color}20`,
                    transform: hoveredIndex === idx ? "rotate(360deg) scale(1.1)" : "rotate(0deg) scale(1)",
                    boxShadow: hoveredIndex === idx ? `0 10px 30px ${item.color}40` : "none"
                  }}
                >
                  <div style={{ color: hoveredIndex === idx ? "white" : item.color }}>
                    {item.icon}
                  </div>
                </div>

                {/* Text */}
                <p className="text-white font-semibold text-lg leading-relaxed">
                  {item.text}
                </p>

                {/* Animated check mark on hover */}
                <div 
                  className="mt-3 transition-all duration-300"
                  style={{
                    opacity: hoveredIndex === idx ? 1 : 0,
                    transform: hoveredIndex === idx ? "scale(1)" : "scale(0)"
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: item.color }}
                  >
                    ✓
                  </div>
                </div>
              </div>

              {/* Decorative corner element */}
              <div 
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: item.color,
                  filter: "blur(20px)"
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button
            className="group px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              color: "white",
              boxShadow: "0 10px 40px rgba(74, 222, 128, 0.4)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Green Journey
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
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </section>
  );
};

export default WhyGoGreen;