import React from "react";
import recentTips from "../data/recentTips.json";
import { FaArrowUp, FaUser } from "react-icons/fa";

const RecentTips = () => {
  return (
    <section className="w-full py-12 px-6 md:px-12 bg-forest text-white">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-accent">
          Recent Tips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {recentTips.slice(0, 5).map((tip) => (
            <div
              key={tip.id}
              className="
                relative overflow-hidden 
                p-5 rounded-2xl shadow-xl 
                transition hover:scale-[1.03] 
                cursor-pointer 
                backdrop-blur-md 
                border border-white/10 
              "
              style={{
                background:
                  "linear-gradient(135deg, rgba(19,94,61,0.55), rgba(9,17,13,0.55))"
              }}
            >
              {/* Accent Top Line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-leaf"></div>

              {/* Organic Accent Shape */}
              <div
                className="absolute -top-6 -right-10 w-32 h-32 rounded-full opacity-[0.12]"
                style={{ background: "var(--accent)" }}
              ></div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-md">
                {tip.title}
              </h3>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-white/70 gap-2 mb-3">
                <FaUser className="text-accent" />
                <span>{tip.authorName}</span>
                <span className="opacity-70">•</span>
                <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Preview */}
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                {tip.preview}
              </p>

              {/* Upvotes */}
              <div className="flex items-center gap-2 text-accent font-semibold">
                <FaArrowUp /> {tip.upvotes} Upvotes
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default RecentTips;
