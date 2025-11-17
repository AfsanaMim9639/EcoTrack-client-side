import React, { useState, useEffect } from "react";

import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt } from "react-icons/fa";


const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="relative w-full py-16 text-white overflow-hidden">
      {/* Background with Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(10, 46, 31, 0.93) 0%, rgba(16, 43, 30, 0.95) 100%)"
        }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-leaf/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 px-6">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--leaf))",
                boxShadow: "0 8px 25px rgba(74, 222, 128, 0.4)"
              }}
            >
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
            Upcoming Events
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Join us in making a difference. Discover eco-friendly events happening near you
          </p>
        </div>

        {/* Marquee Animation Wrapper */}
        <div className="overflow-hidden w-full">
          <div className="flex animate-marquee space-x-6 py-4">
            {/* Duplicate events for seamless loop */}
            {[...events, ...events].map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                onMouseEnter={() => setHoveredId(`${event.id}-${index}`)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative min-w-[320px] md:min-w-[360px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 flex-shrink-0"
                style={{
                  transform: hoveredId === `${event.id}-${index}` ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: hoveredId === `${event.id}-${index}` 
                    ? "0 20px 60px rgba(74, 222, 128, 0.3)" 
                    : "0 10px 40px rgba(0, 0, 0, 0.4)"
                }}
              >
                {/* Event Image Background */}
                <div 
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${
                      event.image || 
                      (index % 8 === 0 ? 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fit=crop' : 
                       index % 8 === 1 ? 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80&fit=crop' :
                       index % 8 === 2 ? 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80&fit=crop' :
                       index % 8 === 3 ? 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80&fit=crop' :
                       index % 8 === 4 ? 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop' :
                       index % 8 === 5 ? 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&fit=crop' :
                       index % 8 === 6 ? 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80&fit=crop' :
                       'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80&fit=crop')
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                ></div>

                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to top, rgba(10, 46, 31, 0.98) 0%, rgba(10, 46, 31, 0.85) 50%, rgba(10, 46, 31, 0.4) 100%)"
                  }}
                ></div>

                {/* Glowing Border */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-opacity duration-300"
                  style={{
                    border: hoveredId === `${event.id}-${index}` ? "2px solid rgba(74, 222, 128, 0.6)" : "1px solid rgba(74, 222, 128, 0.2)",
                    opacity: hoveredId === `${event.id}-${index}` ? 1 : 0.7
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-end min-h-[380px]">
                  
                  {/* Date Badge - Floating */}
                  <div 
                    className="absolute top-6 right-6 px-4 py-3 rounded-xl backdrop-blur-md text-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, rgba(74, 222, 128, 0.25), rgba(34, 197, 94, 0.2))",
                      border: "1px solid rgba(74, 222, 128, 0.4)"
                    }}
                  >
                    <div className="text-accent font-bold text-2xl leading-none">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-white/90 text-xs font-semibold uppercase mt-1">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span 
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md"
                      style={{
                        background: "rgba(74, 222, 128, 0.2)",
                        border: "1px solid var(--accent)",
                        color: "var(--accent)"
                      }}
                    >
                      <FaTicketAlt className="text-[10px]" />
                      EVENT
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/20 mb-4"></div>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(74, 222, 128, 0.15)"
                        }}
                      >
                        <FaMapMarkerAlt className="text-accent text-xs" />
                      </div>
                      <span className="font-medium">{event.location}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(74, 222, 128, 0.15)"
                        }}
                      >
                        <FaClock className="text-accent text-xs" />
                      </div>
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 transform group-hover:scale-105"
                    style={{
                      background: hoveredId === `${event.id}-${index}` 
                        ? "linear-gradient(135deg, var(--accent), var(--leaf))" 
                        : "rgba(74, 222, 128, 0.15)",
                      color: hoveredId === `${event.id}-${index}` ? "white" : "var(--accent)",
                      border: hoveredId === `${event.id}-${index}` ? "none" : "2px solid var(--accent)",
                      boxShadow: hoveredId === `${event.id}-${index}` ? "0 8px 25px rgba(74, 222, 128, 0.4)" : "none"
                    }}
                  >
                    {hoveredId === `${event.id}-${index}` ? "Register Now →" : "Learn More"}
                  </button>
                </div>

                {/* Top Glow Line */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, var(--accent), var(--leaf))",
                    boxShadow: "0 0 20px var(--accent)"
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <button
            className="group px-10 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--leaf))",
              color: "white",
              boxShadow: "0 10px 35px rgba(74, 222, 128, 0.4)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Events
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

      {/* Marquee Animation CSS */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default UpcomingEvents;