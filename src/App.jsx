import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChallengesPage from "./pages/ChallengesPage";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import AddChallengePage from "./pages/AddChallengePage";
function App() {
  const isLoggedIn = true; 
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
        <Route
          path="/challenges/add"
          element={<AddChallengePage isLoggedIn={isLoggedIn} />}
        />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
