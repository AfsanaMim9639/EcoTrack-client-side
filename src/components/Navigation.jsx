// src/components/Navigation.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/header-icon.png";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Use real data from Firebase
        setUser({
          displayName: currentUser.displayName || currentUser.email,
          email: currentUser.email,
          photoURL: currentUser.photoURL || "", // empty if no photo
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-forest/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="EcoTrack Icon" className="w-6 h-6" />
          <h1 className="text-2xl font-semibold tracking-wide">
            Eco<span className="text-accent">Track</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 font-medium bg-white/10 backdrop-blur-md rounded-full px-3 py-1">
          <li><Link to="/" className="px-3 py-1 rounded-full hover:bg-white/10 transition">Home</Link></li>
          <li><Link to="/challenges" className="px-3 py-1 rounded-full hover:bg-white/10 transition">Challenges</Link></li>
          <li><Link to="/my-activities" className="px-3 py-1 rounded-full hover:bg-white/10 transition">My Activities</Link></li>
        </ul>

        {/* Right Side Auth/Profile */}
        <div className="relative flex items-center">
          {!user ? (
            <div className="hidden md:flex space-x-3">
              <Link to="/login" className="px-4 py-2 rounded-full border border-accent hover:bg-accent hover:text-forest transition flex items-center justify-center">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-full bg-accent text-forest font-medium hover:bg-accent/80 transition flex items-center justify-center">Register</Link>
            </div>
          ) : (
            <div className="relative group overflow-visible">
              {/* Profile Button */}
              <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition">
                {user.photoURL && (
                  <img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
                )}
                <span className="font-medium">{user.displayName}</span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 bg-white/15 backdrop-blur-xl">
                <div className="flex items-center space-x-3 p-2 border-b border-white/10">
                  {user.photoURL && (
                    <img src={user.photoURL} className="w-12 h-12 rounded-full" alt="User Avatar" />
                  )}
                  <div>
                    <p className="font-semibold text-white">{user.displayName}</p>
                    <p className="text-sm text-white/70">{user.email}</p>
                  </div>
                </div>

                <ul className="mt-2">
                  <li className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">Profile</li>
                  <li className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">Settings</li>
                  <li className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">My Activities</li>
                  <li onClick={handleLogout} className="px-3 py-2 mt-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 cursor-pointer transition">Logout</li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-3 p-2 rounded-lg hover:bg-white/10 transition"
          >
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden bg-forest/90 backdrop-blur-md px-6 py-4 space-y-2">
          <li><Link to="/" className="block py-2">Home</Link></li>
          <li><Link to="/challenges" className="block py-2">Challenges</Link></li>
          <li><Link to="/my-activities" className="block py-2">My Activities</Link></li>
          {!user && (
            <>
              <li><Link to="/login" className="block py-2">Login</Link></li>
              <li><Link to="/register" className="block py-2">Register</Link></li>
            </>
          )}
          {user && <li onClick={handleLogout} className="block py-2 text-red-400 cursor-pointer">Logout</li>}
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
