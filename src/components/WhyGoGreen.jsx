import React from "react";
import { FaLeaf, FaBolt, FaWater, FaHeartbeat, FaMoneyBillWave, FaHandHoldingHeart } from "react-icons/fa";

const benefits = [
  { icon: <FaLeaf size={28} className="text-accent" />, text: "Reduce carbon footprint" },
  { icon: <FaBolt size={28} className="text-accent" />, text: "Save energy and resources" },
  { icon: <FaWater size={28} className="text-accent" />, text: "Protect natural ecosystems" },
  { icon: <FaHeartbeat size={28} className="text-accent" />, text: "Improve health and well-being" },
  { icon: <FaMoneyBillWave size={28} className="text-accent" />, text: "Save money in the long run" },
  { icon: <FaHandHoldingHeart size={28} className="text-accent" />, text: "Support ethical consumption" },
];

const WhyGoGreen = () => {
  return (
    <section className="bg-forest/5 text-forest py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Why Go Green?
        </h2>
        <p className="text-md md:text-lg text-forest/70 mb-12">
          Living sustainably has many benefits for you and the planet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-6 flex items-start space-x-4 hover:scale-105 transition transform cursor-default shadow-md"
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <p className="text-left font-semibold text-white">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGoGreen;
