import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/PrivateRoute";
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
  const isLoggedIn = true; // replace with actual auth logic

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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Protected Routes */}
        <Route
          path="/challenges/add"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AddChallengePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenges/join/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <JoinChallengePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-activities"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MyActivitiesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-activities/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MyActivityDetailPage userProgressData={userProgress} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
