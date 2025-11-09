import React, { useState, useEffect } from "react";
import slides from "../data/slides.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = slides.length;

  const waitingSlides = [];
  for (let i = 1; i <= 3; i++) {
    waitingSlides.push(slides[(currentSlideIndex + i) % totalSlides]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const current = slides[currentSlideIndex];

  const prevSlide = () => setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);

  return (
    <section className="relative h-[700px] md:h-[800px] w-full overflow-hidden">

      {/* Background */}
      <div
        key={current.id}
        className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] animate-zoomSlow"
        style={{ backgroundImage: `url(${current.image})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] backdrop-brightness-90 z-10"></div>

      {/* Left Content */}
      <div className="absolute inset-0 z-20 flex items-center px-6 md:px-12">
        <div className="max-w-xl text-left text-white">
          <p className="text-accent text-sm md:text-base mb-2">{current.subtitle}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-xl">{current.title}</h2>
          <p className="text-base md:text-lg mb-6 opacity-90 leading-relaxed">{current.description}</p>

          {/* CTA Button */}
          <button className="px-6 py-3 bg-white/10 text-white border border-white/40 rounded-full backdrop-blur-sm hover:bg-accent hover:text-forest transition shadow-xl">
            {current.ctaText}
          </button>
        </div>
      </div>

      {/* Waiting Cards — Right Side */}
      <div className="absolute right-6 bottom-24 flex flex-row space-x-3 z-30">
        {waitingSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className="w-32 h-20 md:w-40 md:h-28 rounded-lg shadow-xl cursor-pointer transform hover:scale-105 transition-transform overflow-hidden border border-white/20"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() =>
              setCurrentSlideIndex((currentSlideIndex + idx + 1) % totalSlides)
            }
          ></div>
        ))}
      </div>

      {/* ✅ Left & Right Arrows */}
      <div className="absolute right-6 bottom-6 flex flex-row space-x-3 z-40">
        <button
          onClick={prevSlide}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-accent text-white hover:text-forest flex items-center justify-center shadow-lg transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-accent text-white hover:text-forest flex items-center justify-center shadow-lg transition"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Zoom Animation */}
      <style>{`
        @keyframes zoomSlow {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-zoomSlow {
          animation: zoomSlow 10s ease-in-out infinite alternate;
        }
      `}</style>

    </section>
  );
};

export default HeroSection;
