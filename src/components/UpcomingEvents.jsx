import React from "react";
import events from "../data/upcomingEvents.json";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const UpcomingEvents = () => {
  return (
    <section
      className="relative w-full py-16 text-white overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A2E1F 0%, #102B1E 100%)"
      }}
    >
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-accent text-center">
        Upcoming Events
      </h2>

      {/* ✅ Marquee Animation Wrapper - No padding, starts from edge */}
      <div className="overflow-hidden w-full">
        <div className="flex animate-marquee space-x-6">
          {/* Duplicate events for seamless loop */}
          {[...events, ...events].map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className="
                min-w-[260px] md:min-w-[300px] 
                p-5 rounded-2xl shadow-xl 
                backdrop-blur-md 
                border border-white/10 
                hover:scale-[1.05] cursor-pointer 
                transition-transform relative
                overflow-hidden
                flex-shrink-0
              "
              style={{
                background:
                  "linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.1))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-leaf"></div>

              {/* Organic accent bubble */}
              <div
                className="absolute -top-8 -right-10 w-32 h-32 rounded-full opacity-[0.12]"
                style={{ background: "var(--accent)" }}
              ></div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 drop-shadow">
                {event.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-accent mb-2">
                <FaCalendarAlt />
                {new Date(event.date).toLocaleDateString()}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-white/80 mb-3">
                <FaMapMarkerAlt className="text-leaf" />
                {event.location}
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Marquee Animation CSS */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default UpcomingEvents;