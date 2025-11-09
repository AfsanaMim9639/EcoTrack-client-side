import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-hero-gradient text-white">
      {/* Navigation */}
      <Navigation />

      {/* Page content */}
      <main className="pt-24 max-w-7xl mx-auto px-6">
        <HeroSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
