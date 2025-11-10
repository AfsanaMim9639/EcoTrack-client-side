import React from "react";
import activeChallengesData from "../data/activeChallenges.json";

const ActiveChallenges = () => {
  return (
    <section className="w-full py-12 px-6 md:px-12 bg-forest text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-accent">
          Active Challenges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeChallengesData.map((challenge) => (
            <div
              key={challenge.id}
              className="relative rounded-xl overflow-hidden border border-accent/40 hover:scale-105 transition-transform shadow-lg cursor-pointer"
            >
              {/* Image */}
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${challenge.image})` }}
              ></div>

              {/* Overlay Info */}
              <div className="absolute inset-0 flex flex-col justify-start p-4 bg-black/20">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">{challenge.title}</h3>
                <p className="text-sm text-accent font-medium">{challenge.category}</p>
                <p className="text-sm text-white/80 mt-1">{challenge.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveChallenges;
