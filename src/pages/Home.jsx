import React from "react";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="min-h-screen bg-hero-gradient text-white">
      {/* Navigation */}
      <Navigation />

      {/* Page content */}
      <main className="pt-24 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to EcoTrack</h1>
        <p className="text-lg">
          This is your home page. Navigation is working and fixed at the top.
        </p>
      </main>
    </div>
  );
};

export default Home;
