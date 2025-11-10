import React, { useEffect, useRef } from "react";
import { FaRegHandPointer, FaChartLine, FaShareAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <FaRegHandPointer size={32} className="text-accent" />,
    title: "Join a Challenge",
    description: "Select an eco-friendly challenge and start your journey.",
  },
  {
    icon: <FaChartLine size={32} className="text-accent" />,
    title: "Track Progress",
    description: "Monitor your actions and see your environmental impact grow.",
  },
  {
    icon: <FaShareAlt size={32} className="text-accent" />,
    title: "Share Tips",
    description: "Share your eco-friendly tips and inspire the community.",
  },
];

const HowItWorks = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: idx * 0.2,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <section
      className="relative w-full py-20 px-6 md:px-12 text-white"
      style={{
        backgroundImage: "url('/assets/images/how-it-works-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
        <p className="text-white/70 mb-12 text-lg md:text-xl">
          Follow these 3 simple steps to start your sustainable journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transform hover:scale-105 transition duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-black/30 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-white/80 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
