import React, { useState } from "react";
import logo from "../assets/images/header-icon.png"; // use forward slashes

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-forest/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Icon Image */}
          <img
            src={logo} // use imported variable
            alt="EcoTrack Icon"
            className="w-6 h-6"
          />
          
          {/* Logo Text */}
          <h1 className="text-2xl font-semibold tracking-wide">
            Eco<span className="text-accent text-[#135E3D]">Track</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <ul
          className="
            hidden md:flex space-x-6 font-medium
            bg-white/10 backdrop-blur-md
            rounded-full px-3 py-1
          "
        >
          {["Home", "Challenges", "My Activities"].map((item) => (
            <li
              key={item}
              className="px-3 py-1 rounded-full hover:bg-white/10 cursor-pointer transition-colors duration-300"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Right Side Auth / Profile */}
        <div className="relative">
          {!isLoggedIn ? (
            <div className="flex space-x-3">
              <button
                className="px-4 py-2 rounded-full border border-accent hover:bg-accent hover:text-forest transition"
                onClick={() => setIsLoggedIn(true)}
              >
                Login
              </button>
              <button className="px-4 py-2 rounded-full bg-accent text-forest font-medium hover:bg-accent/80 transition">
                Register
              </button>
            </div>
          ) : (
            <div className="relative group overflow-visible">
              {/* Profile Button */}
              <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition">
                <img
                  src="https://i.pravatar.cc/32"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">John Doe</span>
              </button>

              {/* Dropdown */}
              <div
                className="
                  absolute right-0 mt-2 w-56 rounded-xl shadow-xl p-3
                  opacity-0 group-hover:opacity-100 
                  pointer-events-none group-hover:pointer-events-auto
                  transition-all duration-200
                  bg-white/15
                  backdrop-blur-xl
                "
              >
                {/* User Info */}
                <div className="flex items-center space-x-3 p-2 border-b border-white/10">
                  <img
                    src="https://i.pravatar.cc/48"
                    className="w-12 h-12 rounded-full"
                    alt="User Avatar"
                  />
                  <div>
                    <p className="font-semibold text-white">John Doe</p>
                    <p className="text-sm text-white/70">john@example.com</p>
                  </div>
                </div>

                {/* Menu Items */}
                <ul className="mt-2">
                  {["Profile", "Settings", "My Activities"].map((item) => (
                    <li
                      key={item}
                      className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition"
                    >
                      {item}
                    </li>
                  ))}

                  {/* Logout */}
                  <li
                    className="px-3 py-2 mt-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 cursor-pointer transition"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
