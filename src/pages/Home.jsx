import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LiveStatistics from "../components/LiveStatistics";
import ActiveChallenges from "../components/ActiveChallenges";
import RecentTips from "../components/RecentTips";
import UpcomingEvents from "../components/UpcomingEvents";
import WhyGoGreen from "../components/WhyGoGreen";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div className="min-h-screen bg-hero-gradient text-white">
      {/* Navigation */}
      <Navigation />

      {/* Page content */}
      <main className=" mx-auto ">
        <HeroSection />
        <LiveStatistics />
        <ActiveChallenges />
        <RecentTips />
        <UpcomingEvents />
        <WhyGoGreen />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
