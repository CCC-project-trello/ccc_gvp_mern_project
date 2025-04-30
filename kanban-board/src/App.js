import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import DashboardPage from "./components/DashboardPage/DashboardPage"; // ✅ Import DashboardPage
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import Board from "./components/Board";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 🏠 Dashboard Page - Default route */}
          <Route path="/" element={<DashboardPage />} />

          {/* 🔐 Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* 📝 Signup Page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* 📋 Task Board Page */}
          <Route
            path="/board"
            element={
              <>
                <h1>Task Manager</h1>
                <Board />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
