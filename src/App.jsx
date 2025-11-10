import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChallengesPage from "./pages/ChallengesPage";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import AddChallengePage from "./pages/AddChallengePage";
import JoinChallengePage from "./pages/JoinChallengePage";
import MyActivitiesPage from "./pages/MyActivitiesPage";
import MyActivityDetailPage from "./pages/MyActivityDetailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  const isLoggedIn = true;

  // Dummy user progress data
  const userProgress = [
    { id: 1, progress: 60 },
    { id: 2, progress: 25 },
    { id: 3, progress: 90 },
  ];

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
        <Route
          path="/challenges/join/:id"
          element={<JoinChallengePage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/my-activities"
          element={<MyActivitiesPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/my-activities/:id"
          element={
            <MyActivityDetailPage
              isLoggedIn={isLoggedIn}
              userProgressData={userProgress} 
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />


      </Routes>
    </Router>
  );
}

export default App;
