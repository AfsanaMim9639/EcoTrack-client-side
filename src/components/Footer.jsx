import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/images/header-icon.png";

const Footer = () => {
  const socialIcons = [
    { icon: FaFacebookF, link: "#" },
    { icon: FaXTwitter, link: "#" },
    { icon: FaInstagram, link: "#" },
    { icon: FaLinkedinIn, link: "#" }
  ];

  return (
    <footer 
      className="relative pt-10 pb-6 text-white"
      style={{ backgroundColor: "var(--darkGreen)" }}  // ✅ theme-based footer bg
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-leaf"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">

        {/* Logo + Description */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="EcoTrack" className="w-6 h-6 rounded-full" />
            <h1 className="text-xl font-bold tracking-wide">
              Eco<span className="text-accent">Track</span>
            </h1>
          </div>
          <p className="text-white/70 text-sm max-w-xs">
            Track your eco-impact, join sustainability challenges, and make a difference every day.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-2 md:space-y-0">
          <div className="flex flex-col space-y-1">
            <h2 className="font-semibold text-white">Quick Links</h2>
            {["Home", "Challenges", "My Activities", "About", "Contact"].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/70 hover:text-accent transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold text-white">Follow Us</h2>
          <div className="flex space-x-3">
            {socialIcons.map(({ icon: Icon, link }, index) => (
              <a
                key={index}
                href={link}
                className="
                  p-2 rounded-full 
                  bg-white/10 backdrop-blur-md 
                  border border-white/10
                  hover:bg-accent hover:border-accent 
                  hover:text-forest 
                  transition-colors shadow-md
                "
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs text-white/60">
        © 2025 EcoTrack • Accessibility & Privacy Notice
      </div>
    </footer>
  );
};

export default Footer;
